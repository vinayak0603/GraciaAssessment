import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "./OnboardingContext";
import { Task2Layout } from "./Task2Layout";
import {
  User,
  MapPin,
  Coins,
  FileText,
  Edit,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Check,
} from "lucide-react";

export default function Review() {
  const {
    formData,
    validateAll,
    errors,
    setActiveTab,
    activeStep,
    setActiveStep,
    resetForm,
  } = useOnboarding();

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // Validate all fields when opening review page
  useEffect(() => {
    validateAll();
    // Set active step to 2 since they are on the review screen
    if (activeStep !== 3) {
      setActiveStep(2);
    }
  }, []);

  const handleEditSection = (tabId) => {
    setActiveTab(tabId);
    setActiveStep(1);
    navigate("/task2/onboarding");
  };

  const handleSubmit = () => {
    const isValid = validateAll();
    if (!isValid) return;

    setSubmitting(true);
    // Simulate server side submission
    setTimeout(() => {
      setSubmitting(false);
      setActiveStep(3);
    }, 2000);
  };

  const handleCreateAnother = () => {
    resetForm();
    navigate("/task2/onboarding");
  };

  const hasCriticalErrors = Object.keys(errors).length > 0;

  // Step 3: Success Confirmation Screen View
  if (activeStep === 3) {
    return (
      <Task2Layout>
        <div className="bg-white border border-field-border rounded-2xl p-8 sm:p-12 shadow-sm text-center max-w-xl mx-auto my-6 animate-scale-up">
          <div className="mx-auto h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-heading">Onboarding Successful</h2>
          <p className="text-sm text-subtle mt-2">
            The customer profile for <span className="font-semibold text-heading">{formData.fullName}</span> has
            been successfully created and uploaded. The profile has been queued for standard compliance review.
          </p>

          <div className="my-8 p-4 rounded-xl bg-page border border-field-border text-left">
            <div className="flex justify-between border-b border-field-border pb-2.5 text-xs">
              <span className="text-subtle font-medium">Customer ID:</span>
              <span className="font-semibold text-heading">CUST-2026-89412</span>
            </div>
            <div className="flex justify-between border-b border-field-border py-2.5 text-xs">
              <span className="text-subtle font-medium">PAN Card:</span>
              <span className="font-semibold text-heading uppercase">{formData.panNumber}</span>
            </div>
            <div className="flex justify-between pt-2.5 text-xs">
              <span className="text-subtle font-medium">Verification Status:</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                <span className="h-1 w-1 bg-emerald-500 rounded-full" /> KYC Pending
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleCreateAnother}
              className="flex-1 h-11 px-5 rounded-lg bg-brand text-white font-semibold text-sm hover:bg-brand-hover transition-all"
            >
              Onboard New Customer
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 h-11 px-5 rounded-lg border border-field-border text-heading bg-white font-semibold text-sm hover:bg-page transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </Task2Layout>
    );
  }

  return (
    <Task2Layout>
      <div className="space-y-6">
        {/* Validation Check Banner */}
        {hasCriticalErrors ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-req/5 border border-req/20 p-4 rounded-2xl text-req animate-pulse">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold">Incomplete Information Detected</p>
                <p className="text-xs opacity-90 mt-0.5">
                  Some mandatory fields are missing or invalid. Please review errors and complete them before submitting.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleEditSection("personal")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-req text-white text-xs font-semibold hover:bg-req/90 transition-all shrink-0"
            >
              Fix Form Details
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200/50 p-4 rounded-2xl text-emerald-800">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-sm font-bold">Verification Successful</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                All validation checks passed. Ready to finalize customer registration.
              </p>
            </div>
          </div>
        )}

        {/* Review Breakdown panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section 1: Personal Details */}
          <ReviewPanel
            title="Personal Details"
            icon={User}
            onEdit={() => handleEditSection("personal")}
          >
            <DetailRow label="Full Name" value={formData.fullName} />
            <DetailRow label="Date of Birth" value={formData.dob} />
            <DetailRow label="Gender" value={formData.gender} />
            <DetailRow label="PAN Number / National ID" value={formData.panNumber} uppercase />
            <DetailRow label="Marital Status" value={formData.maritalStatus} />
          </ReviewPanel>

          {/* Section 2: Contact & Address */}
          <ReviewPanel
            title="Contact & Address"
            icon={MapPin}
            onEdit={() => handleEditSection("contact")}
          >
            <DetailRow label="Email Address" value={formData.email} />
            <DetailRow label="Phone Number" value={formData.phone} />
            <DetailRow
              label="Permanent Address"
              value={
                formData.permAddress
                  ? `${formData.permAddress}, ${formData.permCity}, ${formData.permState} - ${formData.permZip}`
                  : ""
              }
            />
            <DetailRow
              label="Correspondence Address"
              value={
                formData.sameAsPermanent
                  ? "Same as permanent address"
                  : formData.corrAddress
                  ? `${formData.corrAddress}, ${formData.corrCity}, ${formData.corrState} - ${formData.corrZip}`
                  : ""
              }
            />
          </ReviewPanel>

          {/* Section 3: Financial Details */}
          <ReviewPanel
            title="Financial Profile"
            icon={Coins}
            onEdit={() => handleEditSection("financial")}
          >
            <DetailRow label="Employment Status" value={formData.employmentStatus} />
            <DetailRow label="Annual Income Range" value={formData.annualIncome} />
            <DetailRow label="Source of Funds" value={formData.sourceOfFunds} />
            <DetailRow label="Bank Name" value={formData.bankName} />
            <DetailRow label="Bank Account Number" value={formData.accountNumber} />
            <DetailRow label="IFSC Code" value={formData.ifscCode} uppercase />
          </ReviewPanel>

          {/* Section 4: Uploaded Documents */}
          <ReviewPanel
            title="Document Attachments"
            icon={FileText}
            onEdit={() => handleEditSection("documents")}
          >
            <DetailRow
              label="Identity Proof"
              value={formData.idProofUploaded ? formData.idProofName : "Missing"}
              isDoc={formData.idProofUploaded}
            />
            <DetailRow
              label="Address Proof"
              value={formData.addressProofUploaded ? formData.addressProofName : "Missing"}
              isDoc={formData.addressProofUploaded}
            />
          </ReviewPanel>
        </div>

        {/* Action Board */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border border-field-border p-5 rounded-2xl shadow-sm">
          <button
            onClick={() => handleEditSection("documents")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-field-border text-sm font-semibold text-heading hover:bg-page transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Form
          </button>

          <button
            onClick={handleSubmit}
            disabled={hasCriticalErrors || submitting}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 h-11 px-8 rounded-lg text-sm font-semibold text-white transition-all ${
              hasCriticalErrors
                ? "bg-brand-disabled cursor-not-allowed"
                : submitting
                ? "bg-brand/90 cursor-wait"
                : "bg-brand hover:bg-brand-hover shadow-md"
            }`}
          >
            {submitting ? (
              <>Submitting Profile...</>
            ) : (
              <>Confirm & Create Customer <Check className="h-4 w-4" /></>
            )}
          </button>
        </div>
      </div>
    </Task2Layout>
  );
}

/* Local review panels UI elements */

function ReviewPanel({ title, icon: Icon, onEdit, children }) {
  return (
    <div className="bg-white border border-field-border rounded-2xl shadow-sm flex flex-col">
      <div className="px-5 py-3.5 border-b border-field-border bg-page/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Icon className="h-4.5 w-4.5 text-subtle" />
          <h3 className="text-sm font-bold text-heading">{title}</h3>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-[11px] font-bold text-brand hover:underline"
        >
          <Edit className="h-3 w-3" /> Edit
        </button>
      </div>
      <div className="p-5 space-y-4.5 flex-1">{children}</div>
    </div>
  );
}

function DetailRow({ label, value, uppercase, isDoc }) {
  return (
    <div className="border-b border-field-border/60 pb-3 last:border-b-0 last:pb-0">
      <p className="text-[10px] text-subtle font-semibold tracking-wider uppercase">
        {label}
      </p>
      {value ? (
        isDoc ? (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded">
              VERIFIED PDF
            </span>
            <span className="text-xs font-semibold text-heading truncate max-w-[200px]">
              {value}
            </span>
          </div>
        ) : (
          <p
            className={`text-xs font-semibold text-heading mt-1 break-words ${
              uppercase ? "uppercase" : ""
            }`}
          >
            {value}
          </p>
        )
      ) : (
        <p className="text-xs font-semibold text-req mt-1">
          Missing Required Field
        </p>
      )}
    </div>
  );
}
