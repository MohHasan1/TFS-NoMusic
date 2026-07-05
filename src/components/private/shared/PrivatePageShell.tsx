export function PrivatePageShell({ children }: TProps) {
  return (
    <div className="mx-auto flex-1 w-full max-w-7xl space-y-10 px-4 pt-24 pb-32 lg:px-8">
      {children}
    </div>
  );
}

type TProps = {
  children: React.ReactNode;
};
