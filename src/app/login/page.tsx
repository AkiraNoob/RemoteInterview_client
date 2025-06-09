import LoginForm from "~/components/LoginForm";
import RegisterForm from "~/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const LoginPage = () => {
  return (
    <div className="mx-auto max-w-[500px] w-full space-y-10 mt-46">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold">Đăng ký/ Đăng nhập</h1>
        <p>Liên kết tài khoản của bạn để tiếp tục sử dụng Remote Interview</p>
      </div>
      <Tabs>
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger className="cursor-pointer" value="login">
            Đăng nhập
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="register">
            Đăng kí
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
