"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";
import { Check, Upload, X, ImageIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Script from "next/script";

declare global {
  interface Window {
    google: any;
  }
}

const TOTAL_STEPS = 6;

interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
}

interface DocumentDetails {
  panCard: File | null;
  aadhaarCard: File | null;
  businessRegistration: File | null;
}

interface GroundInformation {
  groundName: string;
  sportTypes: string[];
  photos: (File | null)[];
  facilities: {
    enabled: boolean;
    name: string;
    type: string;
  }[];
}

type StepErrors = {
  [key: string]: string;
};

const AVAILABLE_SPORTS = [
  "Cricket",
  "Football",
  "Basketball",
  "Tennis",
  "Badminton",
  "Swimming",
  "Table Tennis",
  "Volleyball",
];

const FACILITY_TYPES = [
  "Washroom",
  "Parking",
  "Changing Room",
  "Equipment Rental",
  "Cafeteria",
  "Seating Area",
  "Lighting",
  "Water Dispenser",
];

interface LocationDetails {
  fullName: string;
  email: string;
  place: string;
  pincode: string;
  latitude: number;
  longitude: number;
}

interface RatesAndHours {
  regularRate: string;
  weekendRate: string;
  openingTime: string;
  closingTime: string;
}

// Add new interface for Terms & Conditions
interface TermsAndConditions {
  accepted: boolean;
}

export default function GroundsOwnerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
  });
  const [documentDetails, setDocumentDetails] = useState<DocumentDetails>({
    panCard: null,
    aadhaarCard: null,
    businessRegistration: null,
  });
  const [groundInfo, setGroundInfo] = useState<GroundInformation>({
    groundName: "",
    sportTypes: [],
    photos: Array(5).fill(null),
    facilities: Array(4).fill({
      enabled: false,
      name: "",
      type: "",
    }),
  });
  const [errors, setErrors] = useState<StepErrors>({});
  const [photoPreview, setPhotoPreview] = useState<string[]>(Array(5).fill(""));
  const [locationDetails, setLocationDetails] = useState<LocationDetails>({
    fullName: "",
    email: "",
    place: "",
    pincode: "",
    latitude: 0,
    longitude: 0,
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [ratesAndHours, setRatesAndHours] = useState<RatesAndHours>({
    regularRate: "",
    weekendRate: "",
    openingTime: "",
    closingTime: "",
  });

  // Add to component state
  const [termsAndConditions, setTermsAndConditions] =
    useState<TermsAndConditions>({
      accepted: false,
    });

  useEffect(() => {
    if (mapLoaded && mapRef.current && !map) {
      // Default center (India)
      const defaultCenter = { lat: 20.5937, lng: 78.9629 };

      const newMap = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 5,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
        ],
      });

      const newMarker = new window.google.maps.Marker({
        map: newMap,
        draggable: true,
        position: defaultCenter,
      });

      newMarker.addListener("dragend", () => {
        const position = newMarker.getPosition();
        if (position) {
          setLocationDetails((prev) => ({
            ...prev,
            latitude: position.lat(),
            longitude: position.lng(),
          }));
        }
      });

      setMap(newMap);
      setMarker(newMarker);
    }
  }, [mapLoaded]);

  // Personal Details Validation
  const validatePersonalDetails = (): boolean => {
    const newErrors: StepErrors = {};

    if (!personalDetails.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!/^[a-zA-Z\s]*$/.test(personalDetails.fullName)) {
      newErrors.fullName = "Only letters and spaces are allowed";
    }

    if (!personalDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!personalDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(personalDetails.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!personalDetails.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Document Details Validation
  const validateDocuments = (): boolean => {
    const newErrors: StepErrors = {};

    if (!documentDetails.panCard) {
      newErrors.panCard = "PAN Card is required";
    }
    if (!documentDetails.aadhaarCard) {
      newErrors.aadhaarCard = "Aadhaar Card is required";
    }
    if (!documentDetails.businessRegistration) {
      newErrors.businessRegistration = "Business Registration is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Ground Information Validation
  const validateGroundInfo = (): boolean => {
    const newErrors: StepErrors = {};

    if (!groundInfo.groundName.trim()) {
      newErrors.groundName = "Ground name is required";
    }

    if (groundInfo.sportTypes.length === 0) {
      newErrors.sportTypes = "At least one sport type must be selected";
    }

    if (!groundInfo.photos.some((photo) => photo !== null)) {
      newErrors.photos = "At least one photo is required";
    }

    const enabledFacilities = groundInfo.facilities.filter((f) => f.enabled);
    if (enabledFacilities.length > 0) {
      enabledFacilities.forEach((facility, index) => {
        if (!facility.name.trim()) {
          newErrors[`facilityName${index}`] = "Facility name is required";
        }
        if (!facility.type) {
          newErrors[`facilityType${index}`] = "Facility type is required";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLocationDetails = (): boolean => {
    const newErrors: StepErrors = {};

    if (!locationDetails.fullName.trim()) {
      newErrors.locationFullName = "Full name is required";
    }

    if (!locationDetails.email.trim()) {
      newErrors.locationEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(locationDetails.email)) {
      newErrors.locationEmail = "Invalid email format";
    }

    if (!locationDetails.place.trim()) {
      newErrors.place = "Place is required";
    }

    if (!locationDetails.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(locationDetails.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    if (locationDetails.latitude === 0 || locationDetails.longitude === 0) {
      newErrors.location = "Please select a location on the map";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRatesAndHours = (): boolean => {
    const newErrors: StepErrors = {};

    // Validate regular rate
    if (!ratesAndHours.regularRate) {
      newErrors.regularRate = "Regular rate is required";
    } else if (!/^\d+$/.test(ratesAndHours.regularRate)) {
      newErrors.regularRate = "Regular rate must be a number";
    } else if (Number.parseInt(ratesAndHours.regularRate) < 100) {
      newErrors.regularRate = "Regular rate must be at least ₹100";
    }

    // Validate weekend rate
    if (!ratesAndHours.weekendRate) {
      newErrors.weekendRate = "Weekend rate is required";
    } else if (!/^\d+$/.test(ratesAndHours.weekendRate)) {
      newErrors.weekendRate = "Weekend rate must be a number";
    } else if (Number.parseInt(ratesAndHours.weekendRate) < 100) {
      newErrors.weekendRate = "Weekend rate must be at least ₹100";
    }

    // Validate opening time
    if (!ratesAndHours.openingTime) {
      newErrors.openingTime = "Opening time is required";
    }

    // Validate closing time
    if (!ratesAndHours.closingTime) {
      newErrors.closingTime = "Closing time is required";
    }

    // Validate time range if both times are provided
    if (ratesAndHours.openingTime && ratesAndHours.closingTime) {
      const opening = new Date(`2000/01/01 ${ratesAndHours.openingTime}`);
      const closing = new Date(`2000/01/01 ${ratesAndHours.closingTime}`);

      if (closing <= opening) {
        newErrors.closingTime = "Closing time must be after opening time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add validation function
  const validateTerms = (): boolean => {
    const newErrors: StepErrors = {};

    if (!termsAndConditions.accepted) {
      newErrors.terms = "You must accept the terms and conditions to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePersonalDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "phone") {
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "fullName") {
      processedValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setPersonalDetails((prev) => ({ ...prev, [name]: processedValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    documentType: keyof DocumentDetails
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          [documentType]: "Only PDF, JPEG, and PNG files are allowed",
        });
        return;
      }

      if (file.size > maxSize) {
        setErrors({
          ...errors,
          [documentType]: "File size should be less than 5MB",
        });
        return;
      }

      setDocumentDetails((prev) => ({ ...prev, [documentType]: file }));
      setErrors((prev) => ({ ...prev, [documentType]: "" }));
    }
  };

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          [`photo${index}`]: "Only JPEG, PNG, and WebP images are allowed",
        });
        return;
      }

      if (file.size > maxSize) {
        setErrors({
          ...errors,
          [`photo${index}`]: "Image size should be less than 5MB",
        });
        return;
      }

      const newPhotos = [...groundInfo.photos];
      newPhotos[index] = file;

      const newPreviews = [...photoPreview];
      newPreviews[index] = URL.createObjectURL(file);

      setGroundInfo((prev) => ({ ...prev, photos: newPhotos }));
      setPhotoPreview(newPreviews);
      setErrors((prev) => ({ ...prev, [`photo${index}`]: "", photos: "" }));
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...groundInfo.photos];
    newPhotos[index] = null;

    const newPreviews = [...photoPreview];
    newPreviews[index] = "";

    setGroundInfo((prev) => ({ ...prev, photos: newPhotos }));
    setPhotoPreview(newPreviews);
  };

  const handleFacilityChange = (
    index: number,
    field: "enabled" | "name" | "type",
    value: boolean | string
  ) => {
    const newFacilities = [...groundInfo.facilities];
    newFacilities[index] = {
      ...newFacilities[index],
      [field]: value,
    };
    setGroundInfo((prev) => ({ ...prev, facilities: newFacilities }));

    // Clear related errors
    if (errors[`facilityName${index}`] || errors[`facilityType${index}`]) {
      setErrors((prev) => ({
        ...prev,
        [`facilityName${index}`]: "",
        [`facilityType${index}`]: "",
      }));
    }
  };

  const handleLocationDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "pincode") {
      processedValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setLocationDetails((prev) => ({ ...prev, [name]: processedValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow numbers
    const numericValue = value.replace(/\D/g, "");
    setRatesAndHours((prev) => ({ ...prev, [name]: numericValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTimeChange = (
    name: "openingTime" | "closingTime",
    value: string
  ) => {
    setRatesAndHours((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const FileUploadField = ({
    label,
    id,
    onChange,
    error,
  }: {
    label: string;
    id: keyof DocumentDetails;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="file"
          onChange={onChange}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <Button
          type="button"
          onClick={() => document.getElementById(id)?.click()}
          className="w-full bg-white/10 text-white hover:bg-white/20"
        >
          <Upload className="mr-2 h-4 w-4" />
          {documentDetails[id] ? documentDetails[id]?.name : `Upload ${label}`}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );

  // Add terms text constant
  const TERMS_TEXT = `Terms and Conditions

1. Acceptance of Terms
By accessing and using our sports ground booking platform, you agree to be bound by these Terms and Conditions.

2. Registration and Account
2.1. You must provide accurate and complete information during registration.
2.2. You are responsible for maintaining the confidentiality of your account.

3. Ground Owner Responsibilities
3.1. Maintain accurate facility information
3.2. Honor all confirmed bookings
3.3. Keep facilities clean and safe
3.4. Provide accurate availability information

4. Booking and Cancellation
4.1. All bookings are subject to availability
4.2. Cancellation policies must be clearly stated
4.3. Refunds will be processed according to stated policies

5. Pricing and Payments
5.1. All prices must be accurately displayed
5.2. Payment terms must be clearly communicated
5.3. Commission rates are as agreed upon registration

6. Safety and Insurance
6.1. Maintain necessary safety equipment
6.2. Carry appropriate liability insurance
6.3. Report any incidents promptly

7. Platform Rules
7.1. No discriminatory practices
7.2. Maintain professional conduct
7.3. Respond to inquiries promptly

8. Termination
We reserve the right to terminate accounts that violate these terms.

9. Modifications
We may modify these terms with notice to users.

10. Governing Law
These terms are governed by applicable local laws.`;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Personal Details
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={personalDetails.fullName}
                  onChange={handlePersonalDetailsChange}
                  placeholder="Enter Full Name"
                  className="bg-white/10 text-white placeholder:text-gray-400"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={personalDetails.email}
                  onChange={handlePersonalDetailsChange}
                  placeholder="Enter Email"
                  className="bg-white/10 text-white placeholder:text-gray-400"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={personalDetails.phone}
                  onChange={handlePersonalDetailsChange}
                  placeholder="Enter Phone"
                  className="bg-white/10 text-white placeholder:text-gray-400"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-white">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={personalDetails.businessName}
                  onChange={handlePersonalDetailsChange}
                  placeholder="Enter Business Name"
                  className="bg-white/10 text-white placeholder:text-gray-400"
                />
                {errors.businessName && (
                  <p className="text-sm text-red-500">{errors.businessName}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Identity Verification
            </h2>
            <div className="space-y-6">
              <FileUploadField
                label="PAN Card"
                id="panCard"
                onChange={(e) => handleFileChange(e, "panCard")}
                error={errors.panCard}
              />
              <FileUploadField
                label="Aadhaar Card"
                id="aadhaarCard"
                onChange={(e) => handleFileChange(e, "aadhaarCard")}
                error={errors.aadhaarCard}
              />
              <FileUploadField
                label="Business Registration"
                id="businessRegistration"
                onChange={(e) => handleFileChange(e, "businessRegistration")}
                error={errors.businessRegistration}
              />
              <p className="text-sm text-gray-400">
                Upload your business registration documents to verify your
                ground and start receiving bookings
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Ground Information
            </h2>
            <div className="space-y-6">
              {/* Ground Name */}
              <div className="space-y-2">
                <Label htmlFor="groundName" className="text-white">
                  Ground Name
                </Label>
                <Input
                  id="groundName"
                  value={groundInfo.groundName}
                  onChange={(e) => {
                    setGroundInfo((prev) => ({
                      ...prev,
                      groundName: e.target.value,
                    }));
                    if (errors.groundName) {
                      setErrors((prev) => ({ ...prev, groundName: "" }));
                    }
                  }}
                  placeholder="Enter Ground Name"
                  className="bg-white/10 text-white placeholder:text-gray-400"
                />
                {errors.groundName && (
                  <p className="text-sm text-red-500">{errors.groundName}</p>
                )}
              </div>

              {/* Sport Types */}
              <div className="space-y-2">
                <Label className="text-white">Sport Type</Label>
                <Select
                  value=""
                  onValueChange={(value) => {
                    if (!groundInfo.sportTypes.includes(value)) {
                      setGroundInfo((prev) => ({
                        ...prev,
                        sportTypes: [...prev.sportTypes, value],
                      }));
                      if (errors.sportTypes) {
                        setErrors((prev) => ({ ...prev, sportTypes: "" }));
                      }
                    }
                  }}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select sports" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_SPORTS.map((sport) => (
                      <SelectItem
                        key={sport}
                        value={sport}
                        disabled={groundInfo.sportTypes.includes(sport)}
                      >
                        {sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Display selected sports as tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {groundInfo.sportTypes.map((sport) => (
                    <div
                      key={sport}
                      className="flex items-center gap-1 rounded-full bg-[#1032B9]/20 px-3 py-1 text-sm text-white"
                    >
                      {sport}
                      <button
                        type="button"
                        onClick={() => {
                          setGroundInfo((prev) => ({
                            ...prev,
                            sportTypes: prev.sportTypes.filter(
                              (s) => s !== sport
                            ),
                          }));
                        }}
                        className="ml-1 rounded-full hover:bg-white/10 p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                {errors.sportTypes && (
                  <p className="text-sm text-red-500">{errors.sportTypes}</p>
                )}
              </div>

              {/* Ground Photos */}
              <div className="space-y-4">
                <Label className="text-white">Ground Photos and Videos</Label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {groundInfo.photos.map((_, index) => (
                    <div key={index} className="relative aspect-square">
                      <div
                        className={cn(
                          "flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed",
                          photoPreview[index]
                            ? "border-[#1032B9]"
                            : "border-white/20 hover:border-white/40"
                        )}
                      >
                        {photoPreview[index] ? (
                          <>
                            <img
                              src={photoPreview[index] || "/placeholder.svg"}
                              alt={`Ground photo ${index + 1}`}
                              className="h-full w-full rounded-lg object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <label
                            htmlFor={`photo-${index}`}
                            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2"
                          >
                            <ImageIcon className="h-8 w-8 text-white/60" />
                            <span className="text-sm text-white/60">
                              Upload
                            </span>
                            <input
                              type="file"
                              id={`photo-${index}`}
                              className="hidden"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={(e) => handlePhotoUpload(e, index)}
                            />
                          </label>
                        )}
                      </div>
                      {errors[`photo${index}`] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[`photo${index}`]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {errors.photos && (
                  <p className="text-sm text-red-500">{errors.photos}</p>
                )}
              </div>

              {/* Facilities */}
              <div className="space-y-4">
                <Label className="text-white">Facilities Available</Label>
                <div className="space-y-4">
                  {groundInfo.facilities.map((facility, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Checkbox
                        id={`facility-${index}`}
                        checked={facility.enabled}
                        onCheckedChange={(checked) =>
                          handleFacilityChange(
                            index,
                            "enabled",
                            checked as boolean
                          )
                        }
                        className="mt-3"
                      />
                      <div className="flex-1 space-y-2">
                        <Input
                          value={facility.name}
                          onChange={(e) =>
                            handleFacilityChange(index, "name", e.target.value)
                          }
                          placeholder={`Facility ${index + 1}`}
                          disabled={!facility.enabled}
                          className="bg-white/10 text-white placeholder:text-gray-400"
                        />
                        {errors[`facilityName${index}`] && (
                          <p className="text-sm text-red-500">
                            {errors[`facilityName${index}`]}
                          </p>
                        )}
                      </div>
                      <Select
                        value={facility.type}
                        onValueChange={(value) =>
                          handleFacilityChange(index, "type", value)
                        }
                        disabled={!facility.enabled}
                      >
                        <SelectTrigger className="w-[200px] bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {FACILITY_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Location & Access
            </h2>
            <div className="space-y-6">
              {/* Map Container */}
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <div ref={mapRef} className="w-full h-full" />
              </div>

              {/* Form Fields */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="locationFullName" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="locationFullName"
                    name="fullName"
                    value={locationDetails.fullName}
                    onChange={handleLocationDetailsChange}
                    placeholder="Enter Full Name"
                    className="bg-white/10 text-white placeholder:text-gray-400"
                  />
                  {errors.locationFullName && (
                    <p className="text-sm text-red-500">
                      {errors.locationFullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locationEmail" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="locationEmail"
                    name="email"
                    type="email"
                    value={locationDetails.email}
                    onChange={handleLocationDetailsChange}
                    placeholder="Enter Email"
                    className="bg-white/10 text-white placeholder:text-gray-400"
                  />
                  {errors.locationEmail && (
                    <p className="text-sm text-red-500">
                      {errors.locationEmail}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="place" className="text-white">
                    Place
                  </Label>
                  <Input
                    id="place"
                    name="place"
                    value={locationDetails.place}
                    onChange={handleLocationDetailsChange}
                    placeholder="Enter city"
                    className="bg-white/10 text-white placeholder:text-gray-400"
                  />
                  {errors.place && (
                    <p className="text-sm text-red-500">{errors.place}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode" className="text-white">
                    Pincode
                  </Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={locationDetails.pincode}
                    onChange={handleLocationDetailsChange}
                    placeholder="Enter Pincode"
                    maxLength={6}
                    className="bg-white/10 text-white placeholder:text-gray-400"
                  />
                  {errors.pincode && (
                    <p className="text-sm text-red-500">{errors.pincode}</p>
                  )}
                </div>
              </div>

              {errors.location && (
                <p className="text-sm text-red-500 text-center">
                  {errors.location}
                </p>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Hourly Rates & Operating Hours
            </h2>
            <div className="space-y-8">
              {/* Hourly Rates */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Hourly Rates</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="regularRate" className="text-white">
                      Regular Rate (per hour)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ₹
                      </span>
                      <Input
                        id="regularRate"
                        name="regularRate"
                        value={ratesAndHours.regularRate}
                        onChange={handleRatesChange}
                        placeholder="Enter rate"
                        className="pl-7 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    {errors.regularRate && (
                      <p className="text-sm text-red-500">
                        {errors.regularRate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weekendRate" className="text-white">
                      Weekend Rate (per hour)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ₹
                      </span>
                      <Input
                        id="weekendRate"
                        name="weekendRate"
                        value={ratesAndHours.weekendRate}
                        onChange={handleRatesChange}
                        placeholder="Enter rate"
                        className="pl-7 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    {errors.weekendRate && (
                      <p className="text-sm text-red-500">
                        {errors.weekendRate}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">
                  Operating Hours
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="openingTime" className="text-white">
                      Opening Time
                    </Label>
                    <Input
                      id="openingTime"
                      type="time"
                      value={ratesAndHours.openingTime}
                      onChange={(e) =>
                        handleTimeChange("openingTime", e.target.value)
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                    {errors.openingTime && (
                      <p className="text-sm text-red-500">
                        {errors.openingTime}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="closingTime" className="text-white">
                      Closing Time
                    </Label>
                    <Input
                      id="closingTime"
                      type="time"
                      value={ratesAndHours.closingTime}
                      onChange={(e) =>
                        handleTimeChange("closingTime", e.target.value)
                      }
                      className="bg-white/10 border-white/20 text-white"
                    />
                    {errors.closingTime && (
                      <p className="text-sm text-red-500">
                        {errors.closingTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Terms & Conditions
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  className="h-[400px] w-full resize-none rounded-lg border border-white/20 bg-white/10 p-4 text-white placeholder:text-gray-400"
                  value={TERMS_TEXT}
                  readOnly
                />
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAndConditions.accepted}
                  onCheckedChange={(checked) => {
                    setTermsAndConditions({ accepted: checked as boolean });
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: "" }));
                    }
                  }}
                />
                <label htmlFor="terms" className="text-sm text-white">
                  I accept the terms and conditions
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500">{errors.terms}</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    switch (currentStep) {
      case 1:
        if (validatePersonalDetails()) {
          setCurrentStep(2);
        }
        break;
      case 2:
        if (validateDocuments()) {
          setCurrentStep(3);
        }
        break;
      case 3:
        if (validateGroundInfo()) {
          setCurrentStep(4);
        }
        break;
      case 4:
        if (validateLocationDetails()) {
          setCurrentStep(5);
        }
        break;
      case 5:
        if (validateRatesAndHours()) {
          setCurrentStep(6);
        }
        break;
      // Add to handleNext function in the switch statement
      case 6:
        if (validateTerms()) {
          // Handle final submission
          console.log("Form submitted successfully");
          // Add your submission logic here
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        onLoad={() => setMapLoaded(true)}
      />
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#1032B9]/20 via-[#1032B9]/10 to-transparent">
        <SiteHeader />
        <main className="flex-1">
          <div className="container mx-auto max-w-3xl px-4 py-24 md:py-32">
            <h1 className="mb-12 text-center text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Register Your Ground With Us..!
            </h1>

            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-center">
              {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200 md:h-10 md:w-10",
                      index + 1 < currentStep
                        ? "border-[#1032B9] bg-[#1032B9] text-white"
                        : index + 1 === currentStep
                          ? "border-[#1032B9] bg-[#1032B9] text-white"
                          : "border-gray-400 text-gray-400"
                    )}
                  >
                    {index + 1 < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < TOTAL_STEPS - 1 && (
                    <div
                      className={cn(
                        "h-[2px] w-8 transition-all duration-200 md:w-12",
                        index + 1 < currentStep ? "bg-[#1032B9]" : "bg-gray-400"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-white/10 bg-[#1032B9]/10 p-6 backdrop-blur-sm md:p-8">
              {renderStepContent()}

              {/* Update the Next button text for the final step */}
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleNext}
                  className="bg-[#1032B9] text-white transition-all duration-300 hover:bg-[#1032B9]/90 hover:scale-105"
                >
                  {currentStep === 6 ? "Submit" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
