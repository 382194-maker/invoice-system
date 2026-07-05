
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
  const [printType, setPrintType] = useState('A4')

  // Safe DOM text replacement before printing
  const displayInvoice = {
    ...invoice,
    summary: {
      ...invoice.summary,
      currencySymbol: isPrinting ? "BDT" : invoice.summary.currencySymbol
    }
  }

  const isPosMode = isPrinting && printType === 'POS';

  return (
    <div className="pos-invoice">
      <PrintButtons 
        targetRef={sheetRef} 
        onPrintStart={(type) => { setIsPrinting(true); setPrintType(type); }}
        onPrintEnd={() => setIsPrinting(false)}
      />
      <POSInvoice ref={sheetRef} invoice={displayInvoice} isPosMode={isPosMode} onClose={onClose} />
    </div>
  )
}

export default Invoice