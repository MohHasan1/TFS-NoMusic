export function AuthShell({ children }: TProps) {
  return (
    <div className="flex-1 h-full flex items-start justify-center px-6 py-16 sm:px-8">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

type TProps = {
  children: React.ReactNode;
};
