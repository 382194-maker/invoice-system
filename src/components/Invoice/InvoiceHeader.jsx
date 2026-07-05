function InvoiceHeader({ company, billingTo, summary }) {
  return (
    <header className="invoice-header">
      <h1 className="invoice-title">Invoice</h1>

      <h2 className="company-name">{company.name}</h2>
      <div className="company-lines">
        <p>{company.address}</p>
        <p>{company.cityLine}</p>
        <p>{company.email}</p>
      </div>

      <div className="invoice-meta">
        <div className="billing-block">
          <h3>Billing To</h3>
          <p className="strong">{billingTo.name}</p>
          <p>{billingTo.address}</p>
          <p className="billing-phone">{billingTo.phone}</p>
        </div>

        <div className="summary-block">
          <h3>Summary</h3>
          <p>
            Invoice Number: <b>{summary.invoiceNumber}</b>
          </p>
          <p>
            Invoice Date: <b>{summary.invoiceDate}</b>
          </p>
          <p>
            Due Date: <b>{summary.dueDate}</b>
          </p>
          <p>
            Currency: <b>{summary.currency}</b>
          </p>
          <p className="due-amount">
            Due Amount: {summary.currencySymbol} {summary.dueAmount}
          </p>
        </div>
      </div>
    </header>
  )
}

export default InvoiceHeader
