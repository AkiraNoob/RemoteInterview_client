"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { postLogin } from "~/api/authentication";
import { Button } from "~/components/ui/button";
import ErrorHelperText from "~/components/ui/error-helper-text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { PATH_NAME } from "~/constants/pathName";
import { ILoginForm } from "~/types/authentication.types";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const navigtaion = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: postLogin,
    onSuccess(data, variables, context) {
      if (data.isOnboarded) {
        navigtaion.replace(PATH_NAME.HOME);
        return;
      }

      navigtaion.replace(PATH_NAME.ONBOARDING);
    },
    onError(error, variables, context) {
      toast("Mật khẩu sai");
    },
  });

  const onSubmit = (data: ILoginForm) => {
    mutate(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label className="text-gray-600">Email</Label>
        <Input
          {...register("email", { required: "Đây là trường bắt buộc" })}
          required
          placeholder="Email *"
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
          type="password"
          placeholder="Mật khẩu *"
        />
        {errors.password && (
          <ErrorHelperText>{errors.password.message}</ErrorHelperText>
        )}
      </div>
      <Button
        loading={isPending}
        className="w-full"
        type="submit"
        variant={"custom"}
      >
        Đăng nhập
      </Button>
    </form>
  );
};

export default LoginForm;
