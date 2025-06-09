import OnboardingForm from "~/components/onboarding/OnboardingForm";
import OnboardingProvider from "~/context/OnboardingContext";

export default function OnBoarding() {
  return (
    <OnboardingProvider>
      <div className="flex h-dvh">
        <div className="p-10 flex items-center justify-center flex-1 shrink-0">
          <OnboardingForm />
        </div>
        <div className="flex-1 h-full flex flex-col gap-3 items-center justify-center">
          <img
            src="/onboarding_illustrator-removebg-preview.png"
            alt="onboarding_illustrator"
            className="w-1/2"
          />
          <p className="text-3xl font-semibold italic">
            Phỏng vấn mọi nơi – Việc làm mọi lúc
          </p>
        </div>
      </div>
    </OnboardingProvider>
  );
}
