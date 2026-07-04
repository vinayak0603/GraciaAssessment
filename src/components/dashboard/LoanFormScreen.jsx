import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoan } from "../../pages/LoanContext";
import { DashboardLayout } from "./DashboardLayout";
import { LoanForm } from "./LoanForm";
import { ChevronRight } from "lucide-react";

export function LoanFormScreen() {
  const { validateForm, isFormComplete } = useLoan();
  const navigate = useNavigate();

  const complete = isFormComplete();

  const handleAddLoan = () => {
    if (complete && validateForm()) {
      navigate("/loan-detail");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-heading">Loans</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-subtle">
              <span>RMS</span>
              <ChevronRight className="h-4 w-4" />
              <span>Loan</span>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-link">Add New Loan</span>
            </div>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              onClick={() => navigate("/")}
              className="h-11 rounded-lg border border-field-border bg-white px-5 text-sm font-semibold text-heading hover:bg-page transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAddLoan}
              disabled={!complete}
              className={`h-11 rounded-lg px-5 text-sm font-semibold text-white transition-all ${
                complete
                  ? "bg-brand hover:bg-brand-hover shadow-md cursor-pointer"
                  : "bg-brand-disabled cursor-not-allowed"
              }`}
            >
              Add Loan
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-field-border bg-white p-5 shadow-sm sm:p-8">
          <LoanForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
