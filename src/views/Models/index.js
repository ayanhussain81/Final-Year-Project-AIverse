import { useEffect, useState } from 'react';
import NFT from 'components/card/NFT';
import { Box, SimpleGrid, Button, Flex, Skeleton } from '@chakra-ui/react';
import axiosInstance from 'services/axiosInstance';
import Title from './title';
import InputElements from './input';
import Popup from './popup';
import Header from 'layouts/HomeHeader';
import useDebounce from 'hooks/useDebounce';

const Marketplace = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState([]);
  const [usecase, setUsecase] = useState([]);
  const [models, setModels] = useState([]);
  const modelsPerPage = 12;
  const [allmodelTypes, setAllModelTypes] = useState([]);
  const [allUseCases, setAllUseCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const debouncedValue = useDebounce(searchValue, 600);

  const getModels = async () => {
    setLoading(true);
    try {
      let url = `/models?currentPage=${currentPage}&category=${type}&usecase=${usecase}`;
      if (debouncedValue) {
        url += `&q=${debouncedValue}`;
      }
      const response = await axiosInstance.get(url);
      setModels(response.data.models);
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
  }, [type, usecase, debouncedValue]);

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

  const indexOfLastModel = currentPage * modelsPerPage;

  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = models.slice(indexOfFirstModel, indexOfLastModel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <Box width="100%" padding={{ base: '80px 20px', md: '80px 140px' }}>
        {loading ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="40px">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} height="300px" />
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="40px">
            {currentModels.map((nft, index) => (
              <NFT key={index} id={nft._id} name={nft.name} author={nft.seller} image={nft.img} category={nft.category} />
            ))}
          </SimpleGrid>
        )}
        {!loading && (
          <Flex justifyContent="center" mt="40px">
            {Array.from({ length: Math.ceil(models.length / modelsPerPage) }).map((_, index) => (
              <Button
                key={index}
                mx={{ base: '1', md: '2' }}
                variant={currentPage === index + 1 ? 'solid' : 'outline'}
                colorScheme="teal"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </Flex>
        )}
      </Box>
    </>
  );
};

export default Marketplace;
