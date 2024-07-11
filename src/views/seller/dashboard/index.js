import { Box, Button, Flex, Spinner } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import Header from 'layouts/sellerHeader';
import React, { useEffect, useState } from 'react';
import Content from './content';
import Popup from './popup';
import { useSelector } from 'react-redux';
import axiosInstance from 'services/axiosInstance';
import useDebounce from 'hooks/useDebounce';
import { useDisclosure } from '@chakra-ui/react';
import ConnectPopup from './ConnectPopup';
import { sellerRoutes } from 'routes';
import { useHeader } from 'contexts/HeaderContext';
import SearchBar from 'shared/searchbar';

const SellerDashboard = () => {
  const { seller, tokens } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userModels, setUserModels] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modelExist, setModelExists] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleShow = () => {
    if (seller?.isAccountActive) {
      setShowModal(true);
      return;
    }
    onOpen();
  };

  const handleClose = () => setShowModal(false);
  const handleChange = (event) => setSearchValue(event.target.value);
  const { setHeaderTitle, setModalListeners } = useHeader();

  const debouncedValue = useDebounce(searchValue, 600);

  const getModelsBySeller = async () => {
    try {
      setIsLoading(true);
      let url = `/models/seller/${seller._id}`;
      if (debouncedValue || page) {
        url += `?modelName=${searchValue}&page=${page}`;
      }
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      });
      if (response?.data?.models?.length > 0) {
        setModelExists(true);
      }
      setUserModels(response.data.models);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error getting models:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getModelsBySeller();
  }, [debouncedValue, page]);

  useEffect(() => {
    setModalListeners((state) => ({ ...state, handleShow: handleShow }));
    setHeaderTitle('Models');
    return () => {
      setHeaderTitle('');
      setModalListeners((state) => ({ ...state, handleShow: undefined }));
    };
  }, [setHeaderTitle, setModalListeners]);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => setPage(i)}
          variant={page === i ? 'solid' : 'outline'}
          colorScheme="linkedin"
          mx="1px"
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <Flex mx={{ base: '10px', md: '0px' }} my="30px" direction="column" justifyContent="start" alignItems="center">
      {(userModels?.length > 0 || modelExist) && <SearchBar height="38px" boxSize="5" handleChange={handleChange} />}
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="70vh">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Content
            name="Models"
            handleShow={handleShow}
            modelExist={modelExist}
            userModels={userModels}
            getModelsBySeller={getModelsBySeller}
          />
        </>
      )}
      <Flex position="absolute" bottom="20" justifyContent="center" mt="4" gap="2">
        {renderPagination()}
      </Flex>
      <Popup showModal={showModal} handleClose={handleClose} getModelsBySeller={getModelsBySeller} />
      <ConnectPopup onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default SellerDashboard;
