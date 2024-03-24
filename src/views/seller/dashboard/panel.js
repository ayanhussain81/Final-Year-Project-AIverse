import { useNavigate } from 'react-router-dom';
import { Stack, StackDivider, Badge, Box } from '@chakra-ui/react';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import { MdEdit } from 'react-icons/md';
import Popup from './popup';
import { useState } from 'react';

const Panel = ({ model, getModelsBySeller }) => {
  const navigate = useNavigate();
  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  return (
    <Box
      bg="#ffffff"
      _hover={{
        bg: 'whitesmoke',
      }}
      cursor="pointer"
      className="mt-4 shadow-lg rounded-lg mobile-sm:w-full tablet:w-1/2 laptop:w-1/2"
      onClick={() => navigate(`/seller/models/${model._id}`)}
    >
      <div className="px-4 py-4 sm:p-6">
        <Stack divider={<StackDivider />} spacing="5">
          <div className="flex justify-between">
            <span className="text-md font-semibold ">{model.name}</span>
            <span className="text-400">Created at {model.createdAt.split('T')[0]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-md">
              Status{' '}
              <Badge ml="2px" colorScheme={`${model.status === 'Deployed' ? 'green' : ''}`}>
                {model.status ? model.status : 'Undefined'}
              </Badge>
            </span>

            <OutlinedButton
              extraClasses="px-2 py-0.5 font-semibold rounded-xl"
              icon={MdEdit}
              iconSize={20}
              mr="2"
              children="Edit"
              onClick={handleEditClick}
            />
          </div>
        </Stack>
      </div>
      <Popup
        id={model._id}
        name={model.name}
        description={model.description}
        category={model.category}
        usecase={model.usecase}
        isEdit={true}
        img={model.img}
        showModal={showModal}
        handleClose={handleClose}
        getModelsBySeller={getModelsBySeller}
      />
    </Box>
  );
};

export default Panel;
