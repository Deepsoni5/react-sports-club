"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Eye, EyeOff } from "lucide-react";

interface PasswordRequirement {
  text: string;
  regex: RegExp;
}

const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { text: "At least 8 characters long", regex: /.{8,}/ },
  { text: "Contains at least one uppercase letter", regex: /[A-Z]/ },
  { text: "Contains at least one lowercase letter", regex: /[a-z]/ },
  { text: "Contains at least one number", regex: /\d/ },
  {
    text: "Contains at least one special character",
    regex: /[!@#$%^&*(),.?":{}|<>]/,
  },
];

export default function NewPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = React.useState<string[]>([]);
  const [metRequirements, setMetRequirements] = React.useState<string[]>([]);

  const validatePassword = (
    password: string
  ): { errors: string[]; met: string[] } => {
    const errors: string[] = [];
    const met: string[] = [];

    PASSWORD_REQUIREMENTS.forEach((requirement) => {
      if (requirement.regex.test(password)) {
        met.push(requirement.text);
      } else {
        errors.push(requirement.text);
      }
    });

    return { errors, met };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const { errors, met } = validatePassword(value);
      setErrors(errors);
      setMetRequirements(met);
    }
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.length > 0) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    // Add your password reset logic here
    console.log("Password reset successful");
    // Navigate to success page or login page
    router.push("/signin");
  };

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

        {/* Right Panel - New Password Form */}
        <div className="flex items-center justify-center p-8 bg-[#1032B9]/10 backdrop-blur-sm rounded-2xl">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">New Password</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white"
                  >
                    Enter New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword.password ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="pr-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword.password ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-white"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pr-10 bg-white/10 border-white/20 text-white placeholder-white/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword.confirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="space-y-1">
                  {PASSWORD_REQUIREMENTS.map((requirement, index) => (
                    <p
                      key={index}
                      className={`text-sm ${
                        metRequirements.includes(requirement.text)
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {requirement.text}
                    </p>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1032B9] hover:bg-[#1032B9]/80 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                disabled={
                  errors.length > 0 ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  metRequirements.length !== PASSWORD_REQUIREMENTS.length
                }
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
