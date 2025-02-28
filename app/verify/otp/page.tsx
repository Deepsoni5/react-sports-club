"use client";
export const dynamic = "force-dynamic"; // Disable prerendering

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useOtpMobileVerifyMutation } from "@/features/auth/services/authRTKs";

export default function OTPVerificationPage() {
  const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(""));
  const [activeInput, setActiveInput] = React.useState(0);
  const [resendTimer, setResendTimer] = React.useState(30);
  const [isResendDisabled, setIsResendDisabled] = React.useState(true);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = React.useState("+91 0000 0000 00");
  const [isLoading, setIsLoading] = React.useState(true); // Add loading state

  // Move `useSearchParams` logic inside `useEffect`
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let phone = params.get("phone")?.trim();
    if (phone && !phone.startsWith("+")) {
      phone = `+${phone}`;
    }
    setPhoneNumber(phone || "+91 0000 0000 00");
    setIsLoading(false); // Set loading to false after phone number is set
  }, []);

  // Using the OTP verification mutation hook
  const [otpVerify, { isLoading: isVerifying, isError, error }] =
    useOtpMobileVerifyMutation();

  React.useEffect(() => {
    // Start resend timer
    if (resendTimer > 0 && isResendDisabled) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
  }, [resendTimer, isResendDisabled]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if a value is entered
    if (value && index < 5) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    const pastedArray = pastedData.split("").filter((x) => /\d/.test(x));

    const newOtp = [...otp];
    pastedArray.forEach((value, index) => {
      if (index < 6) newOtp[index] = value;
    });
    setOtp(newOtp);

    // Focus last filled input or first empty input
    const focusIndex = Math.min(pastedArray.length, 5);
    setActiveInput(focusIndex);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (!isResendDisabled) {
      // Reset OTP fields
      setOtp(new Array(6).fill(""));
      setActiveInput(0);
      inputRefs.current[0]?.focus();

      // Reset timer
      setResendTimer(30);
      setIsResendDisabled(true);

      // Add your resend OTP logic here
      console.log("Resending OTP...");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 6) {
      console.log("Verifying OTP:", otpString);
      try {
        // Calling the OTP verification mutation
        const response = await otpVerify({
          phoneNumber,
          otp: otpString,
        }).unwrap();
        console.log("OTP verified, token:", response.token);
        // Redirect to the dashboard on successful OTP verification
        router.push("/");
      } catch (err) {
        console.error("OTP verification failed", err);
      }
    }
  };

  // Show loading state while phone number is being set
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/signup_main_image.jpg-OaL7SdvSHzslPkOgi7v9x36OTaFawp.jpeg"
            alt="Sports Action"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1032B9]/50 to-transparent" />
        </div>

        {/* Right Panel - OTP Verification Form */}
        <div className="flex items-center justify-center p-8 bg-[#1032B9]/10 backdrop-blur-sm rounded-2xl">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white">
                OTP Verification
              </h1>
              <p className="text-gray-400">
                Enter the code from the SMS we sent to {phoneNumber}
              </p>
              {isError && (
                <p className="text-red-500 text-sm">
                  {"data" in error &&
                  typeof error.data === "object" &&
                  error.data !== null &&
                  "message" in error.data
                    ? (error.data as { message: string }).message
                    : "OTP verification failed"}
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-center gap-2 md:gap-4">
                {otp.map((digit, index) => (
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
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>

              <div className="text-center">
                <div className="text-sm text-gray-400">
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

              <Button
                type="submit"
                className="w-full bg-[#1032B9] hover:bg-[#1032B9]/80 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                disabled={otp.some((digit) => !digit) || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}