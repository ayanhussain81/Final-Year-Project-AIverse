import { Stack, StackDivider, Badge, Box } from '@chakra-ui/react';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import { MdEdit } from 'react-icons/md';

const Panel = ({ model }) => {
  const handleEditClick = (e) => {
    e.stopPropagation();
    console.log('edit');
  };

  return (
    <Box
      bg="#ffffff"
      _hover={{
        bg: 'whitesmoke',
      }}
      cursor="pointer"
      className="mt-4 shadow-lg rounded-lg mobile-sm:w-full tablet:w-1/2 laptop:w-1/2"
      onClick={() => console.log(`/models/${model._id}`)}
    >
      <div className="px-4 py-4 sm:p-6">
        <Stack divider={<StackDivider />} spacing="5">
          <div className="flex justify-between">
            <span className="text-md font-semibold ">{model.name}</span>
            <span className="text-400">Created at {model.createdAt.split('T')[0]}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-md">
              Status <Badge>{model.status ? model.status : 'Undefined'}</Badge>
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
    </Box>
  );
};

export default Panel;
