import { useState } from 'react';
import NFT from 'components/card/NFT';
import { Box, SimpleGrid, Button, Flex } from '@chakra-ui/react';

import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft2 from 'assets/img/nfts/Nft2.png';
import Nft3 from 'assets/img/nfts/Nft3.png';
import Nft4 from 'assets/img/nfts/Nft4.png';
import Nft5 from 'assets/img/nfts/Nft5.png';
import Nft6 from 'assets/img/nfts/Nft6.png';
import Title from './title';
import InputElements from './input';
import Popup from './popup';

const Marketplace = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState([]);
  const [usecase, setUsecase] = useState([]);

  const modelsPerPage = 12;

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleFilter = (type, usecase) => {
    console.log(type, usecase);
    setType(type);
    setUsecase(usecase);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const nfts = [
    {
      name: 'Abstract Colors',
      author: 'By Esthera Jackson',
      image: Nft1,
    },
    {
      name: 'ETH AI Brain',
      author: 'By Nick Wilson',
      image: Nft2,
    },
    {
      name: 'Mesh Gradients ',
      author: 'By Will Smith',
      image: Nft3,
    },
    {
      name: 'Swipe Circles',
      author: 'By Peter Will',
      image: Nft4,
    },
    {
      name: 'Colorful Heaven',
      author: 'By Mark Benjamin',
      image: Nft5,
    },
    {
      name: '3D Cubes Art',
      author: 'By Manny Gates',
      image: Nft6,
    },
    {
      name: 'Abstract Colors',
      author: 'By Esthera Jackson',
      image: Nft1,
    },
    {
      name: 'ETH AI Brain',
      author: 'By Nick Wilson',
      image: Nft2,
    },
    {
      name: 'Mesh Gradients ',
      author: 'By Will Smith',
      image: Nft3,
    },
    {
      name: 'Swipe Circles',
      author: 'By Peter Will',
      image: Nft4,
    },
    {
      name: 'Colorful Heaven',
      author: 'By Mark Benjamin',
      image: Nft5,
    },
    {
      name: '3D Cubes Art',
      author: 'By Manny Gates',
      image: Nft6,
    },
    {
      name: 'Abstract Colors',
      author: 'By Esthera Jackson',
      image: Nft5,
    },
    {
      name: 'ETH AI Brain',
      author: 'By Nick Wilson',
      image: Nft2,
    },
    {
      name: 'Mesh Gradients ',
      author: 'By Will Smith',
      image: Nft6,
    },
  ];

  const modelTypes = ['image', 'text', 'audio', 'video'];
  const useCases = ['classification', 'pattern', 'translation', 'neural network'];

  const indexOfLastModel = currentPage * modelsPerPage;

  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = nfts.slice(indexOfFirstModel, indexOfLastModel);

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
            modelTypes={modelTypes}
            useCases={useCases}
            handleFilter={handleFilter}
          />
        </Flex>
      </Box>
      <Box width="100%" padding="80px 140px">
        <SimpleGrid columns={{ base: 1, md: 4 }} gap="40px">
          {currentModels.map((nft, index) => (
            <NFT key={index} name={nft.name} author={nft.author} image={nft.image} />
          ))}
        </SimpleGrid>
        <Flex justifyContent="center" mt="40px">
          {Array.from({ length: Math.ceil(nfts.length / modelsPerPage) }).map((_, index) => (
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
