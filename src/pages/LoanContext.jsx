import React, { createContext, useContext, useState } from "react";

const LoanContext = createContext();

const defaultLoanState = {
  customerName: "",
  email: "billing@untitledui.com",
  phone: "+91 9876543210",
  loanAmount: "480000",
  productType: "Home Loan",
  bankName: "HDFC Bank",
  stage: "Lead",
  status: "Active",
  priority: "Normal",
  bankCommission: "0.5500",
  referralFee: "0.5500",
  creditExecutive: "Amit Sharma",
  bankExecutive: "Amit Sharma",
  notes: "",
};

const defaultBrokers = [
  { name: "Karthik Agencies", type: "Aggregator", code: "CON-001", commPercent: "0.2750" },
  { name: "XYZ Associates", type: "Connector", code: "CON-001", commPercent: "0.2750" },
  { name: "Prime Services", type: "Sub-connector", code: "CON-001", commPercent: "0.2750" },
];

export function LoanProvider({ children }) {
  const [loanData, setLoanData] = useState(defaultLoanState);
  const [brokers, setBrokers] = useState(defaultBrokers);
  const [errors, setErrors] = useState({});

  const updateField = (name, value) => {
    setLoanData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when editing field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const updateBroker = (index, field, value) => {
    setBrokers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addBroker = () => {
    setBrokers((prev) => [
      ...prev,
      { name: "", type: "Direct", code: "CON-001", commPercent: "0.2750" },
    ]);
  };

  const removeBroker = (index) => {
    setBrokers((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loanData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }
    if (!loanData.loanAmount.trim() || isNaN(loanData.loanAmount)) {
      newErrors.loanAmount = "Valid loan amount is required";
    }
    if (!loanData.productType.trim()) {
      newErrors.productType = "Product type is required";
    }
    if (!loanData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }
    if (!loanData.bankCommission.trim() || isNaN(loanData.bankCommission.replace("%", ""))) {
      newErrors.bankCommission = "Bank commission % is required";
    }
    if (!loanData.referralFee.trim() || isNaN(loanData.referralFee.replace("%", ""))) {
      newErrors.referralFee = "Referral fee is required";
    }
    if (!loanData.creditExecutive.trim()) {
      newErrors.creditExecutive = "Credit executive is required";
    }
    if (!loanData.bankExecutive.trim()) {
      newErrors.bankExecutive = "Bank executive is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormComplete = () => {
    return (
      loanData.customerName.trim() !== "" &&
      loanData.loanAmount.trim() !== "" &&
      !isNaN(String(loanData.loanAmount).replace(/[^0-9.]/g, "")) &&
      loanData.productType.trim() !== "" &&
      loanData.bankName.trim() !== "" &&
      loanData.bankCommission.trim() !== "" &&
      loanData.referralFee.trim() !== "" &&
      loanData.creditExecutive.trim() !== "" &&
      loanData.bankExecutive.trim() !== ""
    );
  };

  return (
    <LoanContext.Provider
      value={{
        loanData,
        brokers,
        errors,
        updateField,
        updateBroker,
        addBroker,
        removeBroker,
        validateForm,
        isFormComplete,
        setLoanData,
        setBrokers,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
}

export function useLoan() {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return context;
}
