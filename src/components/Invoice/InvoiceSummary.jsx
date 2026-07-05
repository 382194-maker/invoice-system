function InvoiceSummary({ totals, transactions, currencySymbol }) {
  return (
    <section className="invoice-summary">
      <div className="invoice-totals-wrap">
        <div className="totals-dot">.</div>
        <div className="invoice-totals">
          <div className="totals-row">
            <span className="label">Subtotal:</span>
            <span className="value">
              {currencySymbol} {totals.subtotal}
            </span>
          </div>
          <div className="totals-row">
            <span className="label">Discount (-):</span>
            <span className="value">
              {currencySymbol} {totals.discount}
            </span>
          </div>
          <div className="totals-row">
            <span className="label">Taxes (+):</span>
            <span className="value">
              {currencySymbol} {totals.taxes}
            </span>
          </div>
          <div className="totals-row totals-grand">
            <span className="label">Total Amout:</span>
            <span className="value">
              {currencySymbol} {totals.totalAmount}
            </span>
          </div>
        </div>
      </div>

      <div className="transaction-history">
        <h3>Transaction History</h3>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Payment Date</th>
              <th>Payment Method</th>
              <th>Comments</th>
              <th className="col-amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.date}</td>
                <td>{tx.method}</td>
                <td>{tx.comments}</td>
                <td className="col-amount">
                  {currencySymbol} {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default InvoiceSummary
