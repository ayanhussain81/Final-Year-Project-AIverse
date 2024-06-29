import { useEffect, useState } from 'react';
import NFT from 'components/card/NFT';
import { Box, SimpleGrid, Button, Flex, Skeleton, IconButton } from '@chakra-ui/react';
import axiosInstance from 'services/axiosInstance';
import Title from './title';
import InputElements from './input';
import Popup from './popup';
import Header from 'layouts/HomeHeader';
import useDebounce from 'hooks/useDebounce';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'; // Example icons, adjust as needed

const Marketplace = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState([]);
  const [usecase, setUsecase] = useState([]);
  const [models, setModels] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [allmodelTypes, setAllModelTypes] = useState([]);
  const [allUseCases, setAllUseCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const debouncedValue = useDebounce(searchValue, 600);

  const getModels = async () => {
    setLoading(true);
    try {
      let url = `/models?category=${type}&usecase=${usecase}`;
      if (debouncedValue || currentPage) {
        url += `&q=${debouncedValue}&currentPage=${currentPage}`;
      }
      const response = await axiosInstance.get(url);
      setModels(response.data.models);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getModelTypes = async () => {
    try {
      const response = await axiosInstance.get('/models/categories');
      setAllModelTypes(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const getModelUsecases = async () => {
    try {
      const response = await axiosInstance.get('/models/usecases');
      setAllUseCases(response.data.usecases);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getModels();
    getModelTypes();
    getModelUsecases();
  }, []);

  useEffect(() => {
    getModels();
  }, [type, usecase, currentPage, debouncedValue]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleFilter = (type, usecase) => {
    console.log(type, usecase);
    setType(type);
    setUsecase(usecase);
  };

  const handleChange = async (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const renderPagination = () => {
    const pages = [];

    const maxButtonsToShow = 3; // Maximum number of buttons to show

    if (totalPages <= maxButtonsToShow) {
      // Show all pages if totalPages is less than or equal to maxButtonsToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? 'solid' : 'outline'}
            colorScheme="linkedin"
            mx="1px"
          >
            {i}
          </Button>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

      if (endPage - startPage < maxButtonsToShow - 1) {
        startPage = Math.max(1, endPage - maxButtonsToShow + 1);
      }

      // Show first page if startPage is greater than 1
      if (startPage > 1) {
        pages.push(
          <Button
            key={1}
            onClick={() => setCurrentPage(1)}
            variant={currentPage === 1 ? 'solid' : 'outline'}
            colorScheme="linkedin"
            mx="1px"
          >
            {1}
          </Button>
        );

        if (startPage > 2) {
          pages.push(
            <Button key="ellipsisStart" variant="outline" disabled mx="1px">
              ...
            </Button>
          );
        }
      }

      // Show pages in range
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? 'solid' : 'outline'}
            colorScheme="linkedin"
            mx="1px"
          >
            {i}
          </Button>
        );
      }

      // Show last page if endPage is less than totalPages
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(
            <Button key="ellipsisEnd" variant="outline" disabled mx="1px">
              ...
            </Button>
          );
        }

        pages.push(
          <Button
            key={totalPages}
            onClick={() => setCurrentPage(totalPages)}
            variant={currentPage === totalPages ? 'solid' : 'outline'}
            colorScheme="linkedin"
            mx="1px"
          >
            {totalPages}
          </Button>
        );
      }
    }

    // Add Previous Page Icon Button
    pages.unshift(
      <IconButton
        key="prevPage"
        icon={<FaAngleLeft />}
        aria-label="Previous Page"
        variant="outline"
        colorScheme="linkedin"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        mx="1px"
      />
    );

    // Add Next Page Icon Button
    pages.push(
      <IconButton
        key="nextPage"
        icon={<FaAngleRight />}
        aria-label="Next Page"
        variant="outline"
        colorScheme="linkedin"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        mx="1px"
      />
    );

    return pages;
  };

  return (
    <>
      <Header />
      <Box mt={{ base: '100px', md: '150px' }}>
        <Title />
        <Flex paddingX={{ base: '10px', sm: '25px', md: '0' }} justifyContent="center">
          <InputElements searchValue={searchValue} handleChange={handleChange} handleShow={handleShow} />
          <Popup
            showModal={showModal}
            handleClose={handleClose}
            modelTypes={allmodelTypes}
            useCases={allUseCases}
            handleFilter={handleFilter}
            category={type}
            usage={usecase}
          />
        </Flex>
      </Box>
      <Box width="100%" marginBottom={20} padding={{ base: '80px 20px', md: '80px 140px' }}>
        {loading ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="40px">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} height="300px" />
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="40px">
            {models.map((nft, index) => (
              <NFT key={index} id={nft._id} name={nft.name} author={nft.seller} image={nft.img} category={nft.category} />
            ))}
          </SimpleGrid>
        )}
        {!loading && (
          <Flex position="absolute" left="0" right="0" bottom="0" alignItems="center" justifyContent="center" mt="4" gap="2">
            {renderPagination()}
          </Flex>
        )}
      </Box>
    </>
  );
};

export default Marketplace;
