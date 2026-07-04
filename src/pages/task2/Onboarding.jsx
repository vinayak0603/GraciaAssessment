import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "./OnboardingContext";
import { Task2Layout } from "./Task2Layout";
import {
  User,
  MapPin,
  Coins,
  FileText,
  UploadCloud,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

export default function Onboarding() {
  const {
    formData,
    errors,
    activeTab,
    updateField,
    validateTab,
    setActiveTab,
    setActiveStep,
  } = useOnboarding();

  const navigate = useNavigate();

  const tabs = [
    { id: "personal", label: "Personal Details", icon: User, desc: "Name, DOB, ID proof details" },
    { id: "contact", label: "Contact & Address", icon: MapPin, desc: "Phone, email & address KYC" },
    { id: "financial", label: "Financial Profile", icon: Coins, desc: "Income, employment & bank" },
    { id: "documents", label: "Documents", icon: FileText, desc: "Identity & address proof uploads" },
  ];

  const handleTabChange = (tabId) => {
    // Validate current tab before moving forward, but always allow moving backward
    const currentIdx = tabs.findIndex((t) => t.id === activeTab);
    const targetIdx = tabs.findIndex((t) => t.id === tabId);

    if (targetIdx > currentIdx) {
      // Moving forward: validate current tab
      if (validateTab(activeTab)) {
        setActiveTab(tabId);
      }
    } else {
      // Moving backward: always allow
      setActiveTab(tabId);
    }
  };

  const handleNext = () => {
    if (!validateTab(activeTab)) return;

    const currentIdx = tabs.findIndex((t) => t.id === activeTab);
    if (currentIdx < tabs.length - 1) {
      setActiveTab(tabs[currentIdx + 1].id);
    } else {
      // On the final tab, proceed to Review
      setActiveStep(2);
      navigate("/task2/review");
    }
  };

  const handleBack = () => {
    const currentIdx = tabs.findIndex((t) => t.id === activeTab);
    if (currentIdx > 0) {
      setActiveTab(tabs[currentIdx - 1].id);
    }
  };

  const triggerMockUpload = (field) => {
    // Set mock uploaded file
    const docName = field === "idProof" ? "Passport_Verification.pdf" : "Utility_Bill_KYC.pdf";
    updateField(`${field}Uploaded`, true);
    updateField(`${field}Name`, docName);
  };

  const removeMockUpload = (field, e) => {
    e.stopPropagation();
    updateField(`${field}Uploaded`, false);
    updateField(`${field}Name`, "");
  };

  return (
    <Task2Layout>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Navigation Tabs List - Desktop Left Sidebar / Mobile Top bar */}
        <div className="bg-white border border-field-border rounded-2xl p-4 shadow-sm flex flex-row overflow-x-auto lg:flex-col gap-1.5 lg:overflow-x-visible shrink-0 scrollbar-none">
          {tabs.map((tb, idx) => {
            const isActive = activeTab === tb.id;
            const TabIcon = tb.icon;
            
            return (
              <button
                key={tb.id}
                onClick={() => handleTabChange(tb.id)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-left transition-all whitespace-nowrap lg:whitespace-normal w-auto lg:w-full shrink-0 ${
                  isActive
                    ? "bg-brand/10 border-l-4 border-brand font-semibold text-link"
                    : "border-l-4 border-transparent text-subtle hover:bg-page hover:text-heading"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? "bg-brand text-white" : "bg-page text-subtle"
                  }`}
                >
                  <TabIcon className="h-4.5 w-4.5" />
                </div>
                <div className="hidden lg:block min-w-0">
                  <p className="text-sm font-semibold leading-tight">{tb.label}</p>
                  <p className="text-[10px] text-subtle leading-tight mt-0.5">{tb.desc}</p>
                </div>
                <span className="lg:hidden text-sm font-semibold">{tb.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Form Content Panel */}
        <div className="bg-white border border-field-border rounded-2xl shadow-sm flex flex-col min-h-[480px]">
          {/* Panel Header */}
          <div className="px-6 py-5 border-b border-field-border flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-heading">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h2>
              <p className="text-xs text-subtle mt-0.5">
                Complete all mandatory fields marked with an asterisk (<span className="text-req">*</span>)
              </p>
            </div>
            <span className="text-xs bg-brand-soft text-brand font-bold px-2.5 py-1 rounded-full">
              Tab {tabs.findIndex((t) => t.id === activeTab) + 1} of 4
            </span>
          </div>

          {/* Form Fields Panel */}
          <div className="flex-1 p-6 sm:p-8">
            {activeTab === "personal" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <Label req>Full Name</Label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    placeholder="Enter customer's full name"
                    onChange={updateField}
                    error={errors.fullName}
                  />
                </div>

                <div>
                  <Label req>Date of Birth</Label>
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={updateField}
                    error={errors.dob}
                  />
                </div>

                <div>
                  <Label req>Gender</Label>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={updateField}
                    error={errors.gender}
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                      { label: "Non-binary", value: "Non-binary" },
                      { label: "Prefer not to disclose", value: "disclose" },
                    ]}
                  />
                </div>

                <div>
                  <Label req>PAN Number / National ID</Label>
                  <Input
                    name="panNumber"
                    value={formData.panNumber}
                    placeholder="e.g. ABCDE1234F"
                    onChange={(n, v) => updateField(n, v.toUpperCase())}
                    error={errors.panNumber}
                  />
                  <p className="text-[10px] text-subtle mt-1">
                    Standard 10-character alphanumeric PAN format.
                  </p>
                </div>

                <div>
                  <Label req>Marital Status</Label>
                  <Select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={updateField}
                    error={errors.maritalStatus}
                    options={[
                      { label: "Single", value: "Single" },
                      { label: "Married", value: "Married" },
                      { label: "Divorced", value: "Divorced" },
                      { label: "Widowed", value: "Widowed" },
                    ]}
                  />
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label req>Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="customer@domain.com"
                      onChange={updateField}
                      error={errors.email}
                    />
                  </div>
                  <div>
                    <Label req>Phone Number</Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      placeholder="e.g. 9876543210"
                      onChange={updateField}
                      error={errors.phone}
                    />
                  </div>
                </div>

                {/* Permanent Address */}
                <div>
                  <h3 className="text-sm font-semibold text-heading mb-3 border-b border-field-border pb-1">
                    Permanent Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <Label req>Street Address</Label>
                      <Input
                        name="permAddress"
                        value={formData.permAddress}
                        placeholder="House No, Apartment, Street"
                        onChange={updateField}
                        error={errors.permAddress}
                      />
                    </div>
                    <div>
                      <Label req>City</Label>
                      <Input
                        name="permCity"
                        value={formData.permCity}
                        placeholder="City"
                        onChange={updateField}
                        error={errors.permCity}
                      />
                    </div>
                    <div>
                      <Label req>State</Label>
                      <Input
                        name="permState"
                        value={formData.permState}
                        placeholder="State"
                        onChange={updateField}
                        error={errors.permState}
                      />
                    </div>
                    <div>
                      <Label req>ZIP / PIN Code</Label>
                      <Input
                        name="permZip"
                        value={formData.permZip}
                        placeholder="ZIP Code"
                        onChange={updateField}
                        error={errors.permZip}
                      />
                    </div>
                  </div>
                </div>

                {/* Correspondence Address Checkbox */}
                <div className="flex items-center gap-2.5 bg-brand-soft/50 p-3.5 rounded-xl border border-brand/10">
                  <input
                    type="checkbox"
                    id="sameAsPermanent"
                    className="h-4.5 w-4.5 rounded border-field-border text-brand accent-brand cursor-pointer"
                    checked={formData.sameAsPermanent}
                    onChange={(e) => updateField("sameAsPermanent", e.target.checked)}
                  />
                  <label htmlFor="sameAsPermanent" className="text-xs font-semibold text-heading cursor-pointer">
                    Correspondence address is same as Permanent address
                  </label>
                </div>

                {/* Correspondence Address fields */}
                {!formData.sameAsPermanent && (
                  <div className="animate-fade-in">
                    <h3 className="text-sm font-semibold text-heading mb-3 border-b border-field-border pb-1">
                      Correspondence Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <Label req>Street Address</Label>
                        <Input
                          name="corrAddress"
                          value={formData.corrAddress}
                          placeholder="Correspondence Street"
                          onChange={updateField}
                          error={errors.corrAddress}
                        />
                      </div>
                      <div>
                        <Label req>City</Label>
                        <Input
                          name="corrCity"
                          value={formData.corrCity}
                          placeholder="City"
                          onChange={updateField}
                          error={errors.corrCity}
                        />
                      </div>
                      <div>
                        <Label req>State</Label>
                        <Input
                          name="corrState"
                          value={formData.corrState}
                          placeholder="State"
                          onChange={updateField}
                          error={errors.corrState}
                        />
                      </div>
                      <div>
                        <Label req>ZIP / PIN Code</Label>
                        <Input
                          name="corrZip"
                          value={formData.corrZip}
                          placeholder="ZIP Code"
                          onChange={updateField}
                          error={errors.corrZip}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "financial" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <Label req>Employment Status</Label>
                  <Select
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={updateField}
                    error={errors.employmentStatus}
                    options={[
                      { label: "Salaried employee", value: "Salaried" },
                      { label: "Self-Employed professional", value: "Self-Employed" },
                      { label: "Business Owner / Entrepreneur", value: "Business Owner" },
                      { label: "Unemployed / Retired", value: "Retired" },
                      { label: "Student", value: "Student" },
                    ]}
                  />
                </div>

                <div>
                  <Label req>Annual Income Range</Label>
                  <Select
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={updateField}
                    error={errors.annualIncome}
                    options={[
                      { label: "Below ₹2.5 Lakhs", value: "Below 2.5L" },
                      { label: "₹2.5 Lakhs - ₹5 Lakhs", value: "2.5L - 5L" },
                      { label: "₹5 Lakhs - ₹10 Lakhs", value: "5L - 10L" },
                      { label: "₹10 Lakhs - ₹25 Lakhs", value: "10L - 25L" },
                      { label: "Above ₹25 Lakhs", value: "Above 25L" },
                    ]}
                  />
                </div>

                <div>
                  <Label req>Source of Funds</Label>
                  <Select
                    name="sourceOfFunds"
                    value={formData.sourceOfFunds}
                    onChange={updateField}
                    error={errors.sourceOfFunds}
                    options={[
                      { label: "Monthly Salary", value: "Salary" },
                      { label: "Business Profit / Dividend", value: "Business" },
                      { label: "Investments / Mutual Funds", value: "Investments" },
                      { label: "Inheritance / Legacy Wealth", value: "Inheritance" },
                      { label: "Gifts / Pocket Money", value: "Gifts" },
                    ]}
                  />
                </div>

                <div>
                  <Label req>Primary Bank Name</Label>
                  <Input
                    name="bankName"
                    value={formData.bankName}
                    placeholder="Enter main bank name"
                    onChange={updateField}
                    error={errors.bankName}
                  />
                </div>

                <div>
                  <Label req>Bank Account Number</Label>
                  <Input
                    name="accountNumber"
                    value={formData.accountNumber}
                    placeholder="Enter bank account number"
                    onChange={updateField}
                    error={errors.accountNumber}
                  />
                </div>

                <div>
                  <Label req>IFSC Code / Sort Code</Label>
                  <Input
                    name="ifscCode"
                    value={formData.ifscCode}
                    placeholder="e.g. HDFC0000123"
                    onChange={(n, v) => updateField(n, v.toUpperCase())}
                    error={errors.ifscCode}
                  />
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label req>Identity Proof (PAN Card / Passport)</Label>
                  <UploadBox
                    uploaded={formData.idProofUploaded}
                    filename={formData.idProofName}
                    onUpload={() => triggerMockUpload("idProof")}
                    onClear={(e) => removeMockUpload("idProof", e)}
                    error={errors.idProofUploaded}
                  />
                </div>

                <div>
                  <Label req>Address Proof (Aadhaar / Utility Bill)</Label>
                  <UploadBox
                    uploaded={formData.addressProofUploaded}
                    filename={formData.addressProofName}
                    onUpload={() => triggerMockUpload("addressProof")}
                    onClear={(e) => removeMockUpload("addressProof", e)}
                    error={errors.addressProofUploaded}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Footer Action Buttons */}
          <div className="px-6 py-4 border-t border-field-border bg-page/50 rounded-b-2xl flex justify-between gap-4 items-center">
            <button
              onClick={handleBack}
              disabled={tabs.findIndex((t) => t.id === activeTab) === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border border-field-border text-sm font-semibold text-heading bg-white hover:bg-page transition-all ${
                tabs.findIndex((t) => t.id === activeTab) === 0 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-hover transition-all"
            >
              {tabs.findIndex((t) => t.id === activeTab) === tabs.length - 1 ? (
                <>Review Profile <Check className="h-4 w-4" /></>
              ) : (
                <>Next Step <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </Task2Layout>
  );
}

/* UI Mini-Component Library Set */

function Label({ children, req }) {
  return (
    <label className="block text-xs font-semibold text-label mb-2">
      {children}
      {req && <span className="text-req"> *</span>}
    </label>
  );
}

function Input({ type = "text", name, value, placeholder, onChange, error }) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm outline-none transition-all focus:ring-2 ${
          error
            ? "border-req/60 focus:border-req focus:ring-req/10"
            : "border-field-border focus:border-brand focus:ring-brand/10"
        }`}
      />
      {error && (
        <div className="flex items-center gap-1.5 text-req text-[10px] font-semibold mt-1">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

function Select({ name, value, onChange, error, options }) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm outline-none transition-all focus:ring-2 appearance-none ${
          error
            ? "border-req/60 focus:border-req focus:ring-req/10"
            : "border-field-border focus:border-brand focus:ring-brand/10"
        }`}
      >
        <option value="">Select option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-subtle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-req text-[10px] font-semibold mt-1">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

function UploadBox({ uploaded, filename, onUpload, onClear, error }) {
  return (
    <div className="relative">
      <div
        onClick={onUpload}
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-page ${
          uploaded
            ? "border-emerald-500 bg-emerald-50/20"
            : error
            ? "border-req/60 bg-req-soft/5"
            : "border-field-border"
        }`}
      >
        <div
          className={`h-11 w-11 rounded-full flex items-center justify-center mb-3 ${
            uploaded ? "bg-emerald-100 text-emerald-600" : "bg-page text-subtle"
          }`}
        >
          <UploadCloud className="h-5.5 w-5.5" />
        </div>

        {uploaded ? (
          <div className="min-w-0 w-full px-2">
            <p className="text-xs font-bold text-emerald-800 truncate">{filename}</p>
            <p className="text-[10px] text-emerald-600 mt-0.5">Ready for review</p>
            <button
              onClick={onClear}
              className="mt-2.5 text-[10px] font-bold text-req hover:underline"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xs font-semibold text-heading">
              Click to upload document
            </p>
            <p className="text-[10px] text-subtle mt-0.5">
              Support PDF, PNG, JPG files up to 5MB
            </p>
          </div>
        )}
      </div>

      {error && !uploaded && (
        <div className="flex items-center gap-1.5 text-req text-[10px] font-semibold mt-1">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
