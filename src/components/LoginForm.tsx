"use client";

import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import ErrorHelperText from "~/components/ui/error-helper-text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ILoginForm } from "~/types/authentication.types";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit = (data: ILoginForm) => {};

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label className="text-gray-600">Email</Label>
        <Input
          {...register("email", { required: "Đây là trường bắt buộc" })}
          required
          placeholder="Email"
        />
        {errors.email && (
          <ErrorHelperText>{errors.email.message}</ErrorHelperText>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-gray-600">Mật khẩu</Label>
        <Input
          {...register("password", { required: "Đây là trường bắt buộc" })}
          required
          placeholder="Mật khẩu"
        />
        {errors.password && (
          <ErrorHelperText>{errors.password.message}</ErrorHelperText>
        )}
      </div>
      <Button className="w-full" type="submit">
        Đăng nhập
      </Button>
    </form>
  );
};

export default LoginForm;
