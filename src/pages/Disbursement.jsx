import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  RefreshCw,
  FileUp,
  ChevronDown,
  Search,
  ArrowUpDown,
  ListFilter,
  Columns3,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
} from "lucide-react";

const kpis = [
  { label: "Total Disbursements", value: "8" },
  { label: "Total Disbursed Amount", value: "₹3,62,50,000" },
  { label: "Submitted", value: "12" },
  { label: "Verified", value: "1" },
  { label: "Processed", value: "5" },
  { label: "Audited", value: "12" },
];

const rows = [
  { date: "30/04/2024", loanId: "LN002-24-1001", status: "Draft", applicant: "Arjun Mehta", bank: "HDFC Bank", sanctioned: "7500.00", verified: "₹7,00,000.00", referral: "0.1500%", credit: "Arjun Mehta", bankExec: "Siddharth" },
  { date: "30/09/2024", loanId: "LN003-24-1002", status: "Submitted", applicant: "Mohit Agarwal", bank: "ICICI Bank", sanctioned: "12000.00", verified: "--", referral: "0.2500%", credit: "Mohit Agarwal", bankExec: "Tanvi M" },
  { date: "12/05/2027", loanId: "LN004-24-1003", status: "Submitted", applicant: "Priya Singh", bank: "Axis Bank", sanctioned: "15000.00", verified: "--", referral: "0.3500%", credit: "Priya Singh", bankExec: "Deepa" },
  { date: "15/01/2024", loanId: "LN005-24-1004", status: "Submitted", applicant: "Simran Anand", bank: "State Bank of India", sanctioned: "22000.00", verified: "--", referral: "0.4500%", credit: "Simran Anand", bankExec: "Suresh" },
  { date: "20/02/2024", loanId: "LN006-24-1005", status: "Submitted", applicant: "Ravi Sharma", bank: "Kotak Mahindra Bank", sanctioned: "30000.00", verified: "--", referral: "0.5500%", credit: "Ravi Sharma", bankExec: "Rahul V" },
  { date: "20/02/2024", loanId: "LN007-24-1006", status: "Submitted", applicant: "Sneha Joshi", bank: "Punjab National Bank", sanctioned: "40000.00", verified: "--", referral: "0.6500%", credit: "Sneha Joshi", bankExec: "Pooja S" },
  { date: "20/02/2024", loanId: "LN001-24-1004", status: "Verified", applicant: "Vikram Desai", bank: "Canara Bank", sanctioned: "55000.00", verified: "₹15,78,901.00", referral: "0.7500%", credit: "Vikram Desai", bankExec: "Manish" },
  { date: "20/02/2024", loanId: "LN008-24-1007", status: "Audited", applicant: "Anjali Rao", bank: "Bank of Baroda", sanctioned: "75000.00", verified: "₹16,89,012.00", referral: "0.8500%", credit: "Anjali Rao", bankExec: "Kavita" },
  { date: "20/02/2024", loanId: "LN009-24-1008", status: "Audited", applicant: "Karan Iyer", bank: "Union Bank of India", sanctioned: "90000.00", verified: "₹17,00,123.00", referral: "0.9500%", credit: "Karan Iyer", bankExec: "Ankit P" },
  { date: "20/02/2024", loanId: "LN010-24-1009", status: "Verified", applicant: "Neha Gupta", bank: "IDFC FIRST Bank", sanctioned: "130000.00", verified: "₹18,11,234.00", referral: "1.1500%", credit: "Neha Gupta", bankExec: "Ritika M" },
];

function StatusBadge({ status }) {
  const draft = status === "Draft";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        draft ? "bg-gray-100 text-subtle" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${draft ? "bg-gray-400" : "bg-emerald-500"}`} />
      {status}
    </span>
  );
}

function ColHead({ label, first }) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-left align-middle">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle">
        {label}
        <ArrowUpDown className="h-3 w-3 text-field-placeholder" />
        {!first && <ListFilter className="h-3 w-3 text-field-placeholder" />}
      </span>
    </th>
  );
}

function Avatar({ name }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img
        src={`https://i.pravatar.cc/40?u=${encodeURIComponent(name)}`}
        alt=""
        className="h-6 w-6 shrink-0 rounded-full object-cover"
      />
      <span className="whitespace-nowrap text-sm text-heading">{name}</span>
    </span>
  );
}

export default function Disbursement() {
  return (
    <DashboardLayout active="Disbursement" secondCompany>
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-heading">Disbursement</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-subtle">
              <span>RMS</span>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-link">Disbursement</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex h-11 items-center gap-2 rounded-lg border border-field-border bg-white px-4 text-sm font-semibold text-heading hover:bg-page">
              <RefreshCw className="h-4 w-4 text-subtle" /> Activity
            </button>
            <button className="flex h-11 items-center gap-2 rounded-lg border border-field-border bg-white px-4 text-sm font-semibold text-heading hover:bg-page">
              <FileUp className="h-4 w-4 text-subtle" /> Import Excel
            </button>
            <button className="flex h-11 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-hover">
              Add Disbursement <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-field-border bg-white p-5 shadow-sm">
              <p className="text-sm text-subtle">{k.label}</p>
              <p className="mt-3 text-2xl font-bold text-heading">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="mt-6 rounded-2xl border border-field-border bg-white p-4 shadow-sm sm:p-5">
          {/* Toolbar */}
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-field-placeholder" />
              <input
                placeholder="Search for Disbursement"
                className="h-11 w-full rounded-lg border border-field-border bg-white pl-10 pr-12 text-sm text-heading outline-none placeholder:text-field-placeholder focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-field-border px-1.5 py-0.5 text-xs text-subtle">
                K
              </span>
            </div>
            <div className="flex gap-3">
              <button className="flex h-11 items-center gap-2 rounded-lg border border-field-border bg-white px-4 text-sm font-semibold text-heading hover:bg-page">
                Saved View <ChevronDown className="h-4 w-4 text-subtle" />
              </button>
              <button className="flex h-11 items-center gap-2 rounded-lg border border-field-border bg-white px-4 text-sm font-semibold text-heading hover:bg-page">
                <FileUp className="h-4 w-4 text-subtle" /> Export All
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="-mx-4 overflow-x-auto sm:-mx-5">
            <table className="w-full min-w-[1100px] border-collapse">
              <thead>
                <tr className="border-y border-field-border bg-page/50">
                  <th className="w-12 px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-field-border accent-brand" />
                  </th>
                  <ColHead label="Disbursement Date" first />
                  <ColHead label="Loan ID" />
                  <ColHead label="Status" />
                  <ColHead label="Applicant Name" />
                  <ColHead label="Bank Name" />
                  <th className="whitespace-nowrap px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle">
                      Sanctioned Amt <ArrowUpDown className="h-3 w-3 text-field-placeholder" />
                      <ListFilter className="h-3 w-3 text-field-placeholder" />
                    </span>
                  </th>
                  <ColHead label="Verified" />
                  <ColHead label="Referral %" />
                  <ColHead label="Credit Executive" />
                  <th className="whitespace-nowrap px-4 py-3 text-left">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle">
                      Bank Exec <Columns3 className="h-3.5 w-3.5 text-field-placeholder" />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-field-border hover:bg-page/40">
                    <td className="px-4 py-3.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-field-border accent-brand" />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm text-heading">{r.date}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm font-medium text-link">
                      <Link to="/loan-detail">{r.loanId}</Link>
                    </td>
                    <td className="px-4 py-3.5"><StatusBadge status={r.status} /></td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm font-semibold text-heading">{r.applicant}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm text-heading">{r.bank}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm text-heading">{r.sanctioned}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm text-subtle">{r.verified}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm text-heading">{r.referral}</td>
                    <td className="px-4 py-3.5"><Avatar name={r.credit} /></td>
                    <td className="px-4 py-3.5"><Avatar name={r.bankExec} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col items-center gap-4 border-t border-field-border pt-4 lg:flex-row lg:justify-between">
            <div className="flex items-center gap-3 text-sm text-subtle">
              <span>Page</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-field-border font-medium text-heading">1</span>
              <span>of 10</span>
              <span className="mx-1 h-5 w-px bg-field-border" />
              <span>Rows per page</span>
              <button className="flex h-8 items-center gap-1.5 rounded-lg border border-field-border px-2.5 font-medium text-heading">
                10 <ChevronDown className="h-3.5 w-3.5 text-subtle" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <PagerBtn><ChevronsLeft className="h-4 w-4" /></PagerBtn>
              <PagerBtn><ChevronLeft className="h-4 w-4" /></PagerBtn>
              <PageNum n="1" active />
              <PageNum n="2" />
              <PageNum n="3" />
              <span className="px-1 text-subtle">...</span>
              <PageNum n="8" />
              <PageNum n="9" />
              <PageNum n="10" />
              <PagerBtn><ChevronRight className="h-4 w-4" /></PagerBtn>
              <PagerBtn><ChevronsRight className="h-4 w-4" /></PagerBtn>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function PagerBtn({ children }) {
  return (
    <button className="grid h-8 w-8 place-items-center rounded-lg border border-field-border text-subtle hover:bg-page">
      {children}
    </button>
  );
}

function PageNum({ n, active }) {
  return (
    <button
      className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-medium ${
        active ? "bg-brand text-white" : "text-subtle hover:bg-page"
      }`}
    >
      {n}
    </button>
  );
}
