
import { useRef } from "react"
import POSInvoice from "./POSInvoice.jsx"
import PrintButtons from "../Print/PrintButtons.jsx"
import "./invoice.css"

/**
 * Top-level invoice viewer. Combines the printable sheet (header, tables,
 * summary) with the print/PDF actions.
 */
function Invoice({ invoice, onClose }) {
  const sheetRef = useRef(null)

  return (
    <div className="pos-invoice">
      <PrintButtons targetRef={sheetRef} />
      <POSInvoice ref={sheetRef} invoice={invoice} onClose={onClose} />
    </div>
  )
}

export default Invoice