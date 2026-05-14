const FormShell = ({ children }: TProps) => {
  return (
    <div className="flex-1 h-full flex items-start justify-center px-4 sm:px-8 py-9 sm:py-32">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default FormShell;

type TProps = {
  children: React.ReactNode;
};
