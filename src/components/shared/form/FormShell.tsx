const FormShell = ({ children }: TProps) => {
  return (
    <div className="flex-1 h-full flex items-start justify-center px-6 py-16 sm:px-8">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default FormShell;

type TProps = {
  children: React.ReactNode;
};
