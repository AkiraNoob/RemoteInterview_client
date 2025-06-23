import LoginForm from "~/components/LoginForm";
import RegisterForm from "~/components/RegisterForm";
import LoginPageIllustration from "~/components/illustration/LoginPageIllustration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PATH_NAME } from "~/constants/pathName";

const LoginPage = () => {
  return (
    <>
      <div className="flex-1 bg-c-secondary/20">
        <div className="mx-auto max-w-[600px] mt-64 w-full space-y-12 h-fit border rounded-xl bg-white overflow-hidden p-5 shadow-xl">
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-bold">Đăng ký/ Đăng nhập</h1>
            <p>Liên kết tài khoản của bạn để tiếp tục sử dụng dịch vụ</p>
          </div>
          <Tabs defaultValue="login">
            <TabsList className="w-full grid grid-cols-2 ">
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
      </div>
      <div className="shrink-0 px-[100px] flex flex-col gap-10 pt-5 items-center  bg-white">
        <div className="flex items-center justify-center">
          <a href={PATH_NAME.HOME}>
            <img
              src="/large_logo_w_text_orange.png"
              alt="logo"
              className="h-[80px]"
            />
          </a>
        </div>
        <div className="mt-[50px] space-y-20">
          <p className="text-3xl font-semibold italic text-c-primary text-center">
            Phỏng vấn mọi nơi – Việc làm mọi lúc
          </p>
          <LoginPageIllustration />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
