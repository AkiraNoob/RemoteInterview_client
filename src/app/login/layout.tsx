const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full min-h-[100vh] flex justify-center">
      {children}
    </div>
  );
};

export default LoginLayout;
