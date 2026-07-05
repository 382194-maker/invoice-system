import { useEffect, useState } from "react"
import Invoice from "../components/Invoice/Invoice.jsx"
import { getInvoice } from "../services/invoiceService.js"

function InvoicePage() {
  const [invoice, setInvoice] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    getInvoice()
      .then((data) => {
        if (active) setInvoice(data)
      })
      .catch((err) => {
        console.log("[v0] Failed to load invoice:", err.message)
        if (active) setError(err.message)
      })
    return () => {
      active = false
    }
  }, [])

  if (error) {
    return <div className="page-state">Unable to load invoice: {error}</div>
  }

  if (!invoice) {
    return <div className="page-state">Loading invoice...</div>
  }

  return (
    <div className="invoice-page">
      <Invoice invoice={invoice} />
    </div>
  )
}

export default InvoicePage
