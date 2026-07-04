import React, { createContext, useContext, useState } from "react";

const OnboardingContext = createContext();

const defaultFormState = {
  // Personal Details
  fullName: "",
  dob: "",
  gender: "",
  panNumber: "",
  maritalStatus: "",

  // Contact & Address
  email: "",
  phone: "",
  permAddress: "",
  permCity: "",
  permState: "",
  permZip: "",
  sameAsPermanent: false,
  corrAddress: "",
  corrCity: "",
  corrState: "",
  corrZip: "",

  // Financial details
  employmentStatus: "",
  annualIncome: "",
  sourceOfFunds: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",

  // Documents (mock status)
  idProofUploaded: false,
  idProofName: "",
  addressProofUploaded: false,
  addressProofName: "",
};

export function OnboardingProvider({ children }) {
  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(1); // 1 = Form, 2 = Review, 3 = Success
  const [activeTab, setActiveTab] = useState("personal"); // personal, contact, financial, documents

  const updateField = (name, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // If sameAsPermanent is checked, sync correspondence fields
      if (name === "sameAsPermanent" && value === true) {
        updated.corrAddress = prev.permAddress;
        updated.corrCity = prev.permCity;
        updated.corrState = prev.permState;
        updated.corrZip = prev.permZip;
      } else if (prev.sameAsPermanent && [
        "permAddress", "permCity", "permState", "permZip"
      ].includes(name)) {
        // Sync if permanent fields change while checked
        const corrKey = name.replace("perm", "corr");
        updated[corrKey] = value;
      }
      
      return updated;
    });

    // Clear validation error when editing field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateTab = (tab) => {
    const newErrors = {};

    if (tab === "personal") {
      if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
      if (!formData.dob) newErrors.dob = "Date of Birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.panNumber.trim()) {
        newErrors.panNumber = "PAN or National ID is required";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(formData.panNumber.trim())) {
        newErrors.panNumber = "Invalid PAN number format (e.g. ABCDE1234F)";
      }
      if (!formData.maritalStatus) newErrors.maritalStatus = "Marital Status is required";
    }

    if (tab === "contact") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
        newErrors.email = "Invalid email address";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
        newErrors.phone = "Invalid phone number (must be 10-12 digits)";
      }
      if (!formData.permAddress.trim()) newErrors.permAddress = "Permanent Address is required";
      if (!formData.permCity.trim()) newErrors.permCity = "City is required";
      if (!formData.permState.trim()) newErrors.permState = "State is required";
      if (!formData.permZip.trim()) newErrors.permZip = "ZIP/PIN code is required";

      if (!formData.sameAsPermanent) {
        if (!formData.corrAddress.trim()) newErrors.corrAddress = "Correspondence Address is required";
        if (!formData.corrCity.trim()) newErrors.corrCity = "City is required";
        if (!formData.corrState.trim()) newErrors.corrState = "State is required";
        if (!formData.corrZip.trim()) newErrors.corrZip = "ZIP/PIN code is required";
      }
    }

    if (tab === "financial") {
      if (!formData.employmentStatus) newErrors.employmentStatus = "Employment Status is required";
      if (!formData.annualIncome) newErrors.annualIncome = "Annual Income Range is required";
      if (!formData.sourceOfFunds) newErrors.sourceOfFunds = "Source of Funds is required";
      if (!formData.bankName.trim()) newErrors.bankName = "Bank Name is required";
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = "Account Number is required";
      } else if (!/^\d{9,18}$/.test(formData.accountNumber.trim())) {
        newErrors.accountNumber = "Account Number must be between 9 and 18 digits";
      }
      if (!formData.ifscCode.trim()) {
        newErrors.ifscCode = "IFSC or Sort Code is required";
      }
    }

    if (tab === "documents") {
      if (!formData.idProofUploaded) newErrors.idProofUploaded = "Please upload Identity Proof document";
      if (!formData.addressProofUploaded) newErrors.addressProofUploaded = "Please upload Address Proof document";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAll = () => {
    const personalOk = validateTab("personal");
    const contactOk = validateTab("contact");
    const financialOk = validateTab("financial");
    const documentsOk = validateTab("documents");

    // Gather errors from all sections
    const allErrors = {};
    
    // Quick runs to consolidate errors
    if (!formData.fullName.trim()) allErrors.fullName = "Full Name is required";
    if (!formData.dob) allErrors.dob = "Date of Birth is required";
    if (!formData.gender) allErrors.gender = "Gender is required";
    if (!formData.panNumber.trim()) allErrors.panNumber = "PAN or National ID is required";
    if (!formData.maritalStatus) allErrors.maritalStatus = "Marital Status is required";

    if (!formData.email.trim()) allErrors.email = "Email is required";
    if (!formData.phone.trim()) allErrors.phone = "Phone number is required";
    if (!formData.permAddress.trim()) allErrors.permAddress = "Permanent Address is required";
    if (!formData.permCity.trim()) allErrors.permCity = "City is required";
    if (!formData.permState.trim()) allErrors.permState = "State is required";
    if (!formData.permZip.trim()) allErrors.permZip = "ZIP/PIN code is required";

    if (!formData.employmentStatus) allErrors.employmentStatus = "Employment Status is required";
    if (!formData.annualIncome) allErrors.annualIncome = "Annual Income Range is required";
    if (!formData.bankName.trim()) allErrors.bankName = "Bank Name is required";
    if (!formData.accountNumber.trim()) allErrors.accountNumber = "Account Number is required";
    if (!formData.ifscCode.trim()) allErrors.ifscCode = "IFSC or Sort Code is required";

    if (!formData.idProofUploaded) allErrors.idProofUploaded = "Upload Identity Proof";
    if (!formData.addressProofUploaded) allErrors.addressProofUploaded = "Upload Address Proof";

    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(defaultFormState);
    setErrors({});
    setActiveStep(1);
    setActiveTab("personal");
  };

  return (
    <OnboardingContext.Provider
      value={{
        formData,
        errors,
        activeStep,
        activeTab,
        updateField,
        validateTab,
        validateAll,
        setActiveStep,
        setActiveTab,
        resetForm,
        setErrors,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
