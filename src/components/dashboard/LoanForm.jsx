import React from "react";
import { useLoan } from "../../pages/LoanContext";
import { ChevronDown, Mail, HelpCircle, Plus, Trash2 } from "lucide-react";

function Req() {
  return <span className="text-req"> *</span>;
}

function Label({ children, req, help }) {
  return (
    <label className="mb-1.5 flex items-center gap-1 text-sm font-medium text-label">
      <span>
        {children}
        {req && <Req />}
      </span>
      {help && <HelpCircle className="h-3.5 w-3.5 text-field-placeholder" />}
    </label>
  );
}

function inputCls(error) {
  return `h-11 w-full rounded-lg border bg-white px-3.5 text-sm outline-none focus:ring-2 transition-all ${
    error
      ? "border-req/60 focus:border-req focus:ring-req/10 text-heading"
      : "border-field-border focus:border-brand focus:ring-brand/20 text-heading"
  }`;
}

function Section({ title, children }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-field-border py-6 first:border-t-0 lg:grid-cols-[220px_minmax(0,1fr)]">
      <h3 className="text-[15px] font-semibold text-heading">{title}</h3>
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">{children}</div>
    </div>
  );
}

export function LoanForm() {
  const {
    loanData,
    brokers,
    errors,
    updateField,
    updateBroker,
    addBroker,
    removeBroker,
  } = useLoan();

  return (
    <div className="px-1 animate-fade-in">
      {/* Customer Information */}
      <Section title="Customer Information">
        <div>
          <Label req>Customer Name</Label>
          <input
            className={inputCls(errors.customerName)}
            placeholder="Enter Customer name"
            value={loanData.customerName}
            onChange={(e) => updateField("customerName", e.target.value)}
          />
          {errors.customerName && (
            <p className="text-xs text-req font-medium mt-1">{errors.customerName}</p>
          )}
        </div>
        <div>
          <Label>Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-field-placeholder" />
            <input
              className={inputCls() + " pl-10"}
              value={loanData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label>Phone Number</Label>
          <input
            className={inputCls()}
            value={loanData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>
      </Section>

      {/* Loan Details */}
      <Section title="Loan Details">
        <div>
          <Label req>Loan Amount</Label>
          <input
            className={inputCls(errors.loanAmount)}
            value={loanData.loanAmount}
            onChange={(e) => updateField("loanAmount", e.target.value)}
          />
          {errors.loanAmount && (
            <p className="text-xs text-req font-medium mt-1">{errors.loanAmount}</p>
          )}
        </div>
        <div>
          <Label req help>Product Type</Label>
          <div className="relative">
            <input
              className={inputCls(errors.productType) + " pr-10"}
              value={loanData.productType}
              onChange={(e) => updateField("productType", e.target.value)}
            />
            <HelpCircle className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-field-placeholder" />
          </div>
          {errors.productType && (
            <p className="text-xs text-req font-medium mt-1">{errors.productType}</p>
          )}
        </div>
        <div>
          <Label req>Bank</Label>
          <input
            className={inputCls(errors.bankName)}
            value={loanData.bankName}
            onChange={(e) => updateField("bankName", e.target.value)}
          />
          {errors.bankName && (
            <p className="text-xs text-req font-medium mt-1">{errors.bankName}</p>
          )}
        </div>
        <div>
          <Label req>Stage</Label>
          <SelectBox
            value={loanData.stage}
            onChange={(val) => updateField("stage", val)}
            options={["Lead", "Contacted", "Proposal", "Under Review", "Approved"]}
          />
        </div>
        <div>
          <Label req>Status</Label>
          <SelectBox
            value={loanData.status}
            onChange={(val) => updateField("status", val)}
            options={["Active", "Pending", "Approved", "Reconciled"]}
            bold
          />
        </div>
        <div>
          <Label>Priority</Label>
          <SelectBox
            value={loanData.priority}
            onChange={(val) => updateField("priority", val)}
            options={["Low", "Normal", "High", "Urgent"]}
          />
        </div>
      </Section>

      {/* Commission & Executive Details */}
      <Section title="Commission & Executive Details">
        <div>
          <Label req>Bank Commission %</Label>
          <input
            className={inputCls(errors.bankCommission)}
            value={loanData.bankCommission}
            onChange={(e) => updateField("bankCommission", e.target.value)}
          />
          {errors.bankCommission && (
            <p className="text-xs text-req font-medium mt-1">{errors.bankCommission}</p>
          )}
        </div>
        <div>
          <Label req>Referral Fee</Label>
          <input
            className={inputCls(errors.referralFee)}
            value={loanData.referralFee}
            onChange={(e) => updateField("referralFee", e.target.value)}
          />
          {errors.referralFee && (
            <p className="text-xs text-req font-medium mt-1">{errors.referralFee}</p>
          )}
        </div>
        <div>
          <Label req>Credit Executive Details</Label>
          <input
            className={inputCls(errors.creditExecutive)}
            value={loanData.creditExecutive}
            onChange={(e) => updateField("creditExecutive", e.target.value)}
          />
          {errors.creditExecutive && (
            <p className="text-xs text-req font-medium mt-1">{errors.creditExecutive}</p>
          )}
        </div>
        <div>
          <Label req>Bank Executive Name</Label>
          <input
            className={inputCls(errors.bankExecutive)}
            value={loanData.bankExecutive}
            onChange={(e) => updateField("bankExecutive", e.target.value)}
          />
          {errors.bankExecutive && (
            <p className="text-xs text-req font-medium mt-1">{errors.bankExecutive}</p>
          )}
        </div>
      </Section>

      {/* Broker Information */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-field-border py-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <h3 className="text-[15px] font-semibold text-heading">Broker Information</h3>
        <div>
          <div className="space-y-4">
            {brokers.map((br, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 gap-x-8 gap-y-5 rounded-xl bg-page/70 p-5 md:grid-cols-2 border border-field-border/60"
              >
                {brokers.length > 1 && (
                  <button
                    onClick={() => removeBroker(index)}
                    className="absolute right-3 top-3 text-subtle hover:text-req transition-all"
                    title="Remove Broker"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <div>
                  <Label req>Broker Name</Label>
                  <input
                    className={inputCls()}
                    placeholder="Enter Broker Name"
                    value={br.name}
                    onChange={(e) => updateBroker(index, "name", e.target.value)}
                  />
                </div>
                <div>
                  <Label req>Broker Type</Label>
                  <SelectBox
                    value={br.type}
                    onChange={(val) => updateBroker(index, "type", val)}
                    options={["Direct", "Aggregator", "Connector", "Sub-connector"]}
                  />
                </div>
                <div>
                  <Label req>Broker Code</Label>
                  <input
                    className={inputCls()}
                    placeholder="CON-001"
                    value={br.code}
                    onChange={(e) => updateBroker(index, "code", e.target.value)}
                  />
                </div>
                <div>
                  <Label req>Commission %</Label>
                  <input
                    className={inputCls()}
                    placeholder="0.2750"
                    value={br.commPercent}
                    onChange={(e) => updateBroker(index, "commPercent", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addBroker}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-hover transition-all"
          >
            <Plus className="h-4 w-4" />
            Add another
          </button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-field-border py-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <h3 className="text-[15px] font-semibold text-heading">Additional Information</h3>
        <div>
          <Label req help>Notes</Label>
          <textarea
            rows={5}
            className="w-full resize-y rounded-lg border border-field-border bg-white px-3.5 py-3 text-sm text-heading outline-none placeholder:text-field-placeholder focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Add any additional notes or comments"
            value={loanData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function SelectBox({ value, onChange, options, bold }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex h-11 w-full items-center rounded-lg border border-field-border bg-white px-3.5 text-sm text-heading outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 appearance-none ${
          bold ? "font-semibold text-link" : ""
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
    </div>
  );
}
