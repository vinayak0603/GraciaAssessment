import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoan } from "./LoanContext";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import {
  ChevronRight,
  Archive,
  RefreshCw,
  Pencil,
  Users,
  CreditCard,
  Coins,
  FileText,
  Wallet,
  File,
} from "lucide-react";

const sideNav = [
  "Customer Information",
  "Loan Information",
  "Broker Infromation",
  "Loan Information",
  "Commission & Executive Details",
  "Notes / Additional Information",
  "Payment & Vouchers",
  "Documents",
];

export default function LoanDetail() {
  const { loanData, brokers } = useLoan();
  const navigate = useNavigate();

  // Parsing and computations
  const sanctioned = parseFloat(String(loanData.loanAmount).replace(/[^0-9.]/g, "")) || 0;
  const bankCommRate = parseFloat(String(loanData.bankCommission).replace(/[^0-9.]/g, "")) || 0;
  const referralRate = parseFloat(String(loanData.referralFee).replace(/[^0-9.]/g, "")) || 0;

  const commissionAmt = sanctioned * (bankCommRate / 100);
  const gstAmt = commissionAmt * 0.18;
  const invoiceAmt = commissionAmt + gstAmt;
  const tdsAmt = Math.round(invoiceAmt * 0.10); // Standard 10% TDS, matching image roundings
  const netReceivable = invoiceAmt - tdsAmt;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  const formatPercent = (val) => {
    const stringVal = String(val);
    return stringVal.endsWith("%") ? stringVal : `${stringVal}%`;
  };

  return (
    <DashboardLayout active="Loans">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 animate-fade-in">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-heading">Loan - LN-2026-04892</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-subtle">
              <span>RMS</span>
              <ChevronRight className="h-4 w-4" />
              <span>Loan</span>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-link">{loanData.customerName || "Rahul Verma"}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <HeaderBtn icon={Archive}>Archive</HeaderBtn>
            <HeaderBtn icon={RefreshCw}>Activity Logs</HeaderBtn>
            <button
              onClick={() => navigate("/")}
              className="flex h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-hover transition-all shadow-md"
            >
              <Pencil className="h-4 w-4" />
              Edit Loan
            </button>
          </div>
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-field-border bg-white p-5 shadow-sm sm:p-6">
          {/* Title row */}
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-heading">{loanData.customerName || "Rahul Verma"}</h2>
              <span className="flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-link">
                <span className="h-1.5 w-1.5 rounded-full bg-link animate-pulse" />
                Reconciled
              </span>
            </div>
            <p className="mt-1 text-sm text-subtle">{loanData.productType || "Home Loan"}</p>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi label="Total Sanctioned Amount" value={formatCurrency(sanctioned)} />
            <Kpi label="Bank Commission %" value={formatPercent(loanData.bankCommission)} />
            <Kpi label="Referral Fee %" value={formatPercent(loanData.referralFee)} />
            <Kpi label="Net Receivable" value={formatCurrency(netReceivable)} money />
          </div>

          {/* Body: side nav + content */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <nav className="hidden h-max space-y-1 lg:block">
              {sideNav.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className={`block rounded-lg px-3 py-2.5 text-sm transition-all ${
                    i === 0
                      ? "bg-brand-soft font-semibold text-link"
                      : "text-subtle hover:bg-page"
                  }`}
                >
                  {s}
                </a>
              ))}
            </nav>

            <div className="min-w-0 space-y-5">
              {/* Customer Information */}
              <Panel icon={Users} title="Customer Information">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <Cell label="Customer Name" value={loanData.customerName || "Rahul Verma"} />
                  <Cell label="Email" value={loanData.email || "rahul.verma@gmail.com"} />
                  <Cell label="Phone Number" value={loanData.phone || "+91 9876543210"} />
                </div>
              </Panel>

              {/* Loan Information */}
              <Panel icon={CreditCard} title="Loan Information">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                  <Cell label="Sanctioned Amt" value={formatCurrency(sanctioned)} />
                  <Cell label="Disbursed Amt" value="₹0.00 (awaiting approval)" />
                  <Cell label="Pending Amt" value={formatCurrency(sanctioned)} />
                  <Cell label="Case ID" value="LN-2026-04892" />
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-4">
                  <Cell label="Loan Type">
                    <span className="inline-block rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-link">
                      {loanData.productType || "Home Loan"}
                    </span>
                  </Cell>
                  <Cell label="Bank" value={loanData.bankName || "HDFC Bank"} />
                  <Cell label="Status">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-link">
                      <span className="h-1.5 w-1.5 rounded-full bg-link" />
                      {loanData.status || "Reconciled"}
                    </span>
                  </Cell>
                  <Cell label="Disbursed Month" value="May 2026" />
                </div>
              </Panel>

              {/* Broker Information */}
              <Panel icon={Users} title="Broker Information">
                <div className="space-y-4">
                  {brokers.map((b, i) => {
                    const brokerCommAmt = sanctioned * (parseFloat(String(b.commPercent).replace(/[^0-9.]/g, "")) / 100);
                    
                    let tone = "text-link bg-brand-soft";
                    if (b.type === "Connector") tone = "text-pink-600 bg-pink-50";
                    else if (b.type === "Sub-connector") tone = "text-amber-700 bg-amber-50";

                    return (
                      <div
                        key={i}
                        className="grid grid-cols-2 gap-4 rounded-xl border border-field-border p-4 sm:grid-cols-5"
                      >
                        <Cell label={`Broker ${i + 1}`} value={b.name || `Broker ${i + 1}`} />
                        <Cell label="Broker Type">
                          <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>
                            {b.type}
                          </span>
                        </Cell>
                        <Cell label="Broker Code" value={b.code || "CON-001"} />
                        <Cell label="Commission Percentage" value={formatPercent(b.commPercent)} />
                        <Cell label="Commission Amt" value={formatCurrency(brokerCommAmt)} />
                      </div>
                    );
                  })}
                </div>
              </Panel>

              {/* Commission & Executive Details */}
              <Panel icon={Coins} title="Commission & Executive Details">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
                  <Cell label="Credit Executive" value={loanData.creditExecutive || "Amit Sharma"} />
                  <Cell label="Bank Executive" value={loanData.bankExecutive || "Priya Nair"} />
                  <Cell label="Bank Commission" value={formatPercent(loanData.bankCommission)} />
                  <Cell label="Referral Fee" value={formatPercent(loanData.referralFee)} />
                  <Cell label="Bill Comm Amt" value={formatCurrency(commissionAmt)} />
                </div>
                <div className="mt-6 grid grid-cols-2 items-start gap-6 sm:grid-cols-4">
                  <Cell label="GST Amt (18%)" value={formatCurrency(gstAmt)} />
                  <Cell label="Invoice Amt" value={formatCurrency(invoiceAmt)} />
                  <Cell label="TDS Amt" value={formatCurrency(tdsAmt)} />
                  <div className="rounded-lg bg-money-bg p-3">
                    <p className="text-xs text-subtle">Net Receivable</p>
                    <p className="mt-1 text-base font-bold text-money-text">{formatCurrency(netReceivable)}</p>
                  </div>
                </div>
              </Panel>

              {/* Notes */}
              <Panel icon={FileText} title="Notes / Additional Information">
                <p className="text-sm leading-relaxed text-label whitespace-pre-wrap">
                  {loanData.notes ||
                    "Customer applied for a home loan for property purchase in Chennai. Documents verified successfully and income proof has been submitted. Awaiting final bank approval and disbursement confirmation."}
                </p>
              </Panel>

              {/* Payment & Vouchers */}
              <Panel icon={Wallet} title="Payment & Vouchers">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                  <Cell label="Surplus / Deficit" value="₹5,000 (Surplus)" />
                  <Cell label="Receipt Amount" value="₹1.3L" />
                  <Cell label="Receipt Date" value="2024-04-15" />
                  <Cell label="Advance Payment" value="₹50,000" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  <Cell label="Payment Date" value="2024-04-01" />
                  <Cell label="Credit Voucher Number" value="VCH-2024-001" />
                </div>
              </Panel>

              {/* Documents */}
              <Panel icon={File} title="Documents">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-field-border p-3"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded bg-red-50 text-[10px] font-bold text-red-600">
                        PDF
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-heading">Invoices.pdf</p>
                        <p className="text-xs text-subtle">800 KB</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function HeaderBtn({ icon: Icon, children }) {
  return (
    <button className="flex h-11 items-center gap-2 rounded-lg border border-field-border bg-white px-4 text-sm font-semibold text-heading hover:bg-page transition-all">
      <Icon className="h-4 w-4 text-subtle" />
      {children}
    </button>
  );
}

function Kpi({ label, value, money }) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all hover:shadow-sm ${
        money ? "border-money-text/20 bg-money-bg" : "border-field-border bg-white"
      }`}
    >
      <p className="text-sm text-subtle">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${money ? "text-money-text" : "text-heading"}`}>
        {value}
      </p>
    </div>
  );
}

function Panel({ icon: Icon, title, children }) {
  return (
    <section className="rounded-xl border border-field-border bg-white">
      <div className="flex items-center gap-2 border-b border-field-border bg-page/60 px-5 py-3 rounded-t-xl">
        <Icon className="h-4 w-4 text-subtle" />
        <h3 className="text-sm font-semibold text-heading">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Cell({ label, value, children }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-subtle">{label}</p>
      {children ? (
        <div className="mt-1.5">{children}</div>
      ) : (
        <p className="mt-1.5 break-words text-sm font-semibold text-heading">{value}</p>
      )}
    </div>
  );
}
