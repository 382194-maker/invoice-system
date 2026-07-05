import invoiceData from "../data/invoice.json"

/**
 * Basic validation to make sure the invoice payload has the shape we expect.
 * Later, when this connects to the Laravel API, only this file needs to change.
 */
function validateInvoice(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Invoice data is missing or invalid.")
  }

  const requiredSections = ["company", "billingTo", "summary", "items", "totals"]
  requiredSections.forEach((section) => {
    if (!(section in data)) {
      throw new Error(`Invoice data is missing the "${section}" section.`)
    }
  })

  if (!Array.isArray(data.items)) {
    throw new Error("Invoice items must be an array.")
  }

  return data
}

/**
 * Returns the invoice. Currently reads from the bundled JSON file.
 * Swap this implementation for a `fetch()` call to the Laravel API later.
 */
export async function getInvoice() {
  // Simulate an async source so the switch to a real API is seamless.
  return Promise.resolve(validateInvoice(invoiceData))
}
