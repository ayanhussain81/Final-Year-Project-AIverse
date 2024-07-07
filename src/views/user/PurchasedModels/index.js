import React, { useEffect, useState } from 'react';
import { Box, Flex, Spinner, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useHeader } from 'contexts/HeaderContext';
import PurchasedModelItem from 'views/admin/marketplace/components/HistoryItem';
import axiosInstance from 'services/axiosInstance';
import NoModelsMessage from './components/NoModelsMessage';
import { useSelector } from 'react-redux';
import ConfirmationModal from './components/ConfirmationModal';

const PurchasedModels = () => {
  const { setHeaderTitle } = useHeader();
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user: userState } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPurchaseId, setSelectedPurchaseId] = useState(null);

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const calculateTimeAgo = (timestamp) => {
    const now = new Date();
    const purchaseTime = new Date(timestamp);
    const timeDifference = now - purchaseTime;

    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `Purchased ${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `Purchased ${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `Purchased ${hours} hours ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `Purchased ${days} days ago`;
    }
  };

  const handleDeleteSubscription = (purchaseId) => {
    setSelectedPurchaseId(purchaseId);
    onOpen();
  };

  const handleConfirm = () => {
    setModels(models.filter((model) => model._id !== selectedPurchaseId));
    onClose();
  };

  useEffect(() => {
    setHeaderTitle('Your Models');
    return () => {
      setHeaderTitle('');
    };
  }, [setHeaderTitle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/users/user-models/${userState?.id}`);
        setModels(response.data.allModels);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card w="80%" m="auto" my="2rem" p="0rem">
      <Flex align={{ sm: 'flex-start', lg: 'center' }} justify="space-between" px="22px" py="18px">
        <Text color={textColor} fontSize="xl" fontWeight="600">
          Purchased Models
        </Text>
      </Flex>

      {!isLoading ? (
        !!models.length ? (
          models.map((item) => (
            <PurchasedModelItem
              key={item.id}
              name={item?.model?.name}
              author={`By ${item?.model?.seller?.userId?.name}`}
              date={calculateTimeAgo(item?.purchaseDate)}
              apiKey={item?.apiKey}
              image={item?.model?.img}
              handleDeleteSubscription={() => handleDeleteSubscription(item?._id)}
            />
          ))
        ) : (
          <NoModelsMessage />
        )
      ) : (
        <Flex padding="2rem" alignItems="center" justifyContent="center">
          <Spinner size="md" />
        </Flex>
      )}

      <ConfirmationModal isOpen={isOpen} onClose={onClose} onConfirm={handleConfirm} purchaseId={selectedPurchaseId} />
    </Card>
  );
};

export default PurchasedModels;
