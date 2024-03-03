export default function OutlinedButton({ children, icon: Icon, iconSize, extraClasses, mr, ...attributes }) {
  return (
    <button
      {...attributes}
      className={`block | border-2 border-solid border-primary rounded-md | hover:bg-primary text-primary hover:text-neutral-100 | active:scale-95 | transition-all | ${extraClasses}`}
    >
      {Icon && (
        <Icon className={`inline-block mr-${mr ? mr : '3'}`} style={{ fontSize: iconSize, paddingBottom: '1.7px' }} />
      )}
      {children}
    </button>
  );
}
