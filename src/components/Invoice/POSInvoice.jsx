import { forwardRef } from "react"
import InvoiceHeader from "./InvoiceHeader.jsx"
import MedicineTable from "./MedicineTable.jsx"
import InvoiceSummary from "./InvoiceSummary.jsx"

/**
 * The printable invoice "sheet". This is the element captured for the PDF.
 */
const POSInvoice = forwardRef(function POSInvoice({ invoice, onClose }, ref) {
  const { company, billingTo, summary, prescription, items, totals, transactions } = invoice
  const currencySymbol = summary.currencySymbol

  return (
    <div className="invoice-sheet" ref={ref}>
      {onClose && (
        <button
          type="button"
          className="invoice-close"
          aria-label="Close invoice"
          onClick={onClose}
        >
          &times;
        </button>
      )}

      <InvoiceHeader company={company} billingTo={billingTo} summary={summary} />

      <MedicineTable
        prescription={prescription}
        items={items}
        currencySymbol={currencySymbol}
      />

      <InvoiceSummary
        totals={totals}
        transactions={transactions}
        currencySymbol={currencySymbol}
      />
    </div>
  )
})

export default POSInvoice
