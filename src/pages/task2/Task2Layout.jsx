import React from "react";
import { Link } from "react-router-dom";
import { useOnboarding } from "./OnboardingContext";
import { ArrowLeft, ShieldCheck, ClipboardList, Eye, CheckCircle2 } from "lucide-react";
import logoImg from "../../assets/logo.png";

export function Task2Layout({ children }) {
  const { activeStep } = useOnboarding();

  const steps = [
    { num: 1, label: "Form Entry", icon: ClipboardList },
    { num: 2, label: "Review & Submit", icon: Eye },
    { num: 3, label: "Confirmation", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-page text-heading font-sans flex flex-col">
      {/* Top Banner - Brand and Back Button */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-field-border py-4 px-4 sm:px-8 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-field-border bg-white text-subtle hover:bg-page hover:text-heading transition-all"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="FinBowl Logo" className="h-8 w-8 object-contain" />
              <div>
                <span className="text-base font-bold tracking-tight text-heading">FinBowl</span>
                <span className="text-[10px] block font-semibold text-brand tracking-widest uppercase -mt-0.5">
                  Portal
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-3 py-1.5 rounded-full">
            <ShieldCheck className="h-4 w-4 text-emerald-600 animate-pulse" />
            <span className="hidden sm:inline">Bank-Grade 256-Bit Security</span>
            <span className="sm:hidden">Secure Portal</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 py-8 flex flex-col">
        {/* Step Indicator Panel */}
        <div className="mb-8 bg-white border border-field-border rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
            <div className="md:max-w-xs">
              <h1 className="text-xl font-bold text-heading">Customer Onboarding</h1>
              <p className="text-xs text-subtle mt-0.5">
                Register new customer profile and compile KYC validation details.
              </p>
            </div>
            
            {/* Steps bar */}
            <div className="flex flex-1 max-w-xl items-center justify-between relative mt-2 md:mt-0">
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-field-border z-0" />
              {steps.map((st) => {
                const isActive = activeStep === st.num;
                const isCompleted = activeStep > st.num;
                const StepIcon = st.icon;

                return (
                  <div key={st.num} className="flex flex-col items-center z-10 relative">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? "bg-brand border-brand text-white"
                          : isActive
                          ? "bg-white border-brand text-brand ring-4 ring-brand/10 shadow-sm"
                          : "bg-white border-field-border text-field-placeholder"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-4.5 w-4.5" />
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-bold mt-2 transition-all ${
                        isActive ? "text-brand" : isCompleted ? "text-heading" : "text-subtle"
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic page contents render here */}
        <div className="flex-1 flex flex-col min-h-0">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-field-border bg-white text-center text-xs text-subtle">
        <p>© 2026 FinBowl RMS. Compliance Verified. Terms & Privacy apply.</p>
      </footer>
    </div>
  );
}
