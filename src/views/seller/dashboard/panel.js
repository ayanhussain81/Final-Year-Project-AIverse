import { useNavigate } from 'react-router-dom';
import { Stack, StackDivider, Badge, Box } from '@chakra-ui/react';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import { MdEdit, MdDelete } from 'react-icons/md';
import Popup from './popup';
import { useRef, useState } from 'react';
import ConfirmationPopup from './confirmationPopup';
import axiosInstance from 'services/axiosInstance';

const Panel = ({ model, getModelsBySeller }) => {
  const toast_ref = useRef();
  const navigate = useNavigate();
  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmationModal(true);
  };
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const handleConfirmationClose = () => setConfirmationModal(false);

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/models/delete/${id}`);
    getModelsBySeller();
    handleConfirmationClose();
    // toast_ref.current.showSuccessToast('Model deleted successfully');
  };

  return (
    <Box
      bg="#ffffff"
      _hover={{
        bg: 'whitesmoke',
      }}
      cursor="pointer"
      className="mt-4 shadow-lg rounded-lg mobile-sm:w-full tablet:w-1/2 laptop:w-1/2"
      onClick={() => navigate(`/seller/models/${model._id}`, { state: { isPurchased: model.isPurchased } })}
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

            <div className="flex gap-2">
              <OutlinedButton
                extraClasses="px-2 py-0.5 font-semibold rounded-xl"
                icon={MdEdit}
                iconSize={20}
                mr="2"
                onClick={handleEditClick}
              />
              {!model.isPurchased && (
                <OutlinedButton
                  extraClasses="px-2 py-0.5 font-semibold rounded-xl border-accent-900 border-primary hover:bg-neutral-100 text-accent-900 hover:text-neutral-100"
                  icon={MdDelete}
                  iconColor="accent-900"
                  iconSize={20}
                  mr="2"
                  onClick={handleDeleteClick}
                />
              )}
            </div>
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
      <ConfirmationPopup
        ref={toast_ref}
        showModal={confirmationModal}
        handleClose={handleConfirmationClose}
        handleConfirmation={() => handleDelete(model._id)}
        message="Are you sure you want to delete this model?"
      />
    </Box>
  );
};

export default Panel;
