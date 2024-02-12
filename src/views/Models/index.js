import { useEffect, useState } from 'react';
import NFT from 'components/card/NFT';
import { Box, SimpleGrid, Button, Flex } from '@chakra-ui/react';
import axiosInstance from 'services/axiosInstance';
import Title from './title';
import InputElements from './input';
import Popup from './popup';

const Marketplace = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [querySearch, setQuerySearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState([]);
  const [usecase, setUsecase] = useState([]);
  const [models, setModels] = useState([]);
  const modelsPerPage = 12;
  const [allmodelTypes, setAllModelTypes] = useState([]);
  const [allUseCases, setAllUseCases] = useState([]);

  const getModels = async () => {
    try {
      let url = `/models?currentPage=${currentPage}&category=${type}&usecase=${usecase}`;
      if (searchValue) {
        url += `&q=${searchValue}`;
      }
      const response = await axiosInstance.get(url);
      setModels(response.data.models);
    } catch (error) {
      console.log(error);
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
  }, [type, usecase, querySearch]);

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
    setQuerySearch(value);
  };

  const indexOfLastModel = currentPage * modelsPerPage;

  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = models.slice(indexOfFirstModel, indexOfLastModel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Box mt="70px">
        <Title />
        <Flex justifyContent="center">
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
      <Box width="100%" padding="80px 140px">
        <SimpleGrid columns={{ base: 1, md: 4 }} gap="40px">
          {currentModels.map((nft, index) => (
            <NFT key={index} name={nft.name} author={nft.owner} image={nft.img} category={nft.category} />
          ))}
        </SimpleGrid>
        <Flex justifyContent="center" mt="40px">
          {Array.from({ length: Math.ceil(models.length / modelsPerPage) }).map((_, index) => (
            <Button
              key={index}
              mx="2"
              variant={currentPage === index + 1 ? 'solid' : 'outline'}
              colorScheme="teal"
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Marketplace;
