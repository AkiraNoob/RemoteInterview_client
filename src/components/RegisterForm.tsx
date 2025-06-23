"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { postRegister } from "~/api/authentication";
import { Button } from "~/components/ui/button";
import ErrorHelperText from "~/components/ui/error-helper-text";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { PATH_NAME } from "~/constants/pathName";
import { IRegisterForm } from "~/types/authentication.types";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const navigtaion = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: postRegister,
    onSuccess(data, variables, context) {
      navigtaion.replace(PATH_NAME.ONBOARDING);
    },
  });

  const onSubmit = (data: IRegisterForm) => {
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
        Đăng kí
      </Button>
    </form>
  );
};

export default RegisterForm;
