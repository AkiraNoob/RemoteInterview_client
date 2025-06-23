import OnboardingForm from "~/components/onboarding/OnboardingForm";

export default function OnBoarding() {
  return (
    <div className="flex h-dvh">
      <div className="p-10 flex items-center justify-center flex-1 shrink-0 bg-c-secondary/20">
        <OnboardingForm />
      </div>
      <div className="px-[100px] h-full flex flex-col pt-20 gap-2 items-center ">
        <div className="flex items-center justify-center">
          <img
            src="/large_logo_w_text_orange.png"
            alt="logo"
            className="h-[80px]"
          />
        </div>
        <div className="mt-[50px] flex flex-col items-center">
          <img
            src="/onboarding_illustrator-removebg-preview.png"
            alt="onboarding_illustrator"
            className="w-[80%]"
          />
          <p className="text-3xl font-semibold italic text-c-primary text-center">
            Phỏng vấn mọi nơi – Việc làm mọi lúc
          </p>
        </div>
      </div>
    </div>
  );
}
