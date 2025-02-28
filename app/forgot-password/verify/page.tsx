"use client";
export const dynamic = "force-dynamic"; // Disable prerendering

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmailVerificationPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("example@gmail.com");
  const [isLoading, setIsLoading] = React.useState(true); // Add loading state
  const [code, setCode] = React.useState<string[]>(new Array(4).fill(""));
  const [activeInput, setActiveInput] = React.useState(0);
  const [resendTimer, setResendTimer] = React.useState(30);
  const [isResendDisabled, setIsResendDisabled] = React.useState(true);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Move `useSearchParams` logic inside `useEffect`
  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
    setIsLoading(false); // Set loading to false after email is set
  }, []);

  React.useEffect(() => {
    if (resendTimer > 0 && isResendDisabled) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
  }, [resendTimer, isResendDisabled]);

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 4);
    const pastedArray = pastedData.split("").filter((x) => /\d/.test(x));

    const newCode = [...code];
    pastedArray.forEach((value, index) => {
      if (index < 4) newCode[index] = value;
    });
    setCode(newCode);

    const focusIndex = Math.min(pastedArray.length, 3);
    setActiveInput(focusIndex);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (!isResendDisabled) {
      setCode(new Array(4).fill(""));
      setActiveInput(0);
      inputRefs.current[0]?.focus();
      setResendTimer(30);
      setIsResendDisabled(true);
      console.log("Resending verification code to:", email);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length === 4) {
      console.log("Verifying code:", verificationCode);
      router.push("/forgot-password/reset");
    }
  };

  // Show loading state while email is being set
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#000314]">
      <SiteHeader />
      <div className="flex-1 container mx-auto my-8 grid lg:grid-cols-2 gap-8 pt-16 md:pt-20">
        {/* Left Panel - Image */}
        <div className="relative hidden lg:block rounded-2xl overflow-hidden">
          <Image
            src="/auth_hero.png"
            alt="Sports Action"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1032B9]/50 to-transparent" />
        </div>

        {/* Right Panel - Email Verification Form */}
        <div className="flex items-center justify-center p-8 bg-[#1032B9]/10 backdrop-blur-sm rounded-2xl">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <button
                onClick={() => router.back()}
                className="flex items-center text-white/80 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">
                  Email Verification
                </h2>
                <p className="text-gray-300">
                  Enter the code from the email we sent to {email}
                </p>

                <div className="flex justify-center gap-2 md:gap-4">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        handleChange(value, index);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className={cn(
                        "w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-semibold rounded-md border",
                        "focus:outline-none focus:ring-2 focus:ring-[#EF3DF6] focus:border-transparent",
                        "transition-all duration-200 bg-white/10 text-white",
                        activeInput === index
                          ? "border-[#EF3DF6]"
                          : "border-white/20"
                      )}
                      aria-label={`Verification code digit ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-300">
                    Don't receive the OTP?{" "}
                    <button
                      type="button"
                      onClick={handleResend}
                      className={cn(
                        "font-semibold",
                        isResendDisabled
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-[#EF3DF6] hover:text-[#EF3DF6]/80"
                      )}
                      disabled={isResendDisabled}
                    >
                      RESEND
                      {isResendDisabled && ` (${resendTimer}s)`}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1032B9] hover:bg-[#1032B9]/80 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                disabled={code.some((digit) => !digit)}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}