
import { useRef, useState } from "react"
import POSInvoice from "./POSInvoice.jsx"
import PrintButtons from "../Print/PrintButtons.jsx"
import "./invoice.css"

/**
 * Top-level invoice viewer. Combines the printable sheet (header, tables,
 * summary) with the print/PDF actions.
 */
function Invoice({ invoice, onClose }) {
  const sheetRef = useRef(null)
  const [isPrinting, setIsPrinting] = useState(false)

  // Safe DOM text replacement before printing
  const displayInvoice = {
    ...invoice,
    summary: {
      ...invoice.summary,
      currencySymbol: isPrinting ? "BDT" : invoice.summary.currencySymbol
    }
  }

  return (
    <div className="pos-invoice">
      <PrintButtons 
        targetRef={sheetRef} 
        onPrintStart={() => setIsPrinting(true)}
        onPrintEnd={() => setIsPrinting(false)}
      />
      <POSInvoice ref={sheetRef} invoice={displayInvoice} onClose={onClose} />
    </div>
  )
}

export default Invoice