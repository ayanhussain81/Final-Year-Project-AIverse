import { Spinner } from '@chakra-ui/react';

export default function ContainedButton({ isLoading, children, icon: Icon, iconSize, extraClasses, ...attributes }) {
  return (
    <button
      {...attributes}
      className={`block text-neutral-100 rounded-md bg-primary hover:bg-primary/90 | active:scale-95 | transition-all ${extraClasses}`}
    >
      {Icon && <Icon className="inline-block mr-3" style={{ fontSize: iconSize, paddingBottom: '1.7px' }} />}
      {!isLoading ? children : <Spinner size="sm" />}
    </button>
  );
}
