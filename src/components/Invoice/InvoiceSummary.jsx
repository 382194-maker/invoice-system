function InvoiceSummary({ totals, transactions, currencySymbol, isPosMode }) {
  if (isPosMode) {
    const printDate = new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    
    return (
      <section className="invoice-summary pos-summary" style={{ fontSize: '11px', marginTop: '10px' }}>
        <div className="pos-totals" style={{ borderBottom: '1px dashed #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
            <span>Subtotal:</span>
            <span>{currencySymbol} {totals.subtotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
            <span>Discount:</span>
            <span>{currencySymbol} {totals.discount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
            <span>Tax:</span>
            <span>{currencySymbol} {totals.taxes}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>{currencySymbol} {totals.totalAmount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
            <span>Paid:</span>
            <span>{currencySymbol} {totals.paidAmount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', fontWeight: 'bold' }}>
            <span>Due:</span>
            <span>{currencySymbol} {totals.dueAmount}</span>
          </div>
        </div>

        <div className="pos-transaction-history" style={{ borderBottom: '1px dashed #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
          <h4 style={{ margin: '0 0 6px 0', textAlign: 'center', fontSize: '11px' }}>Transaction History</h4>
          <table style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <th style={{ padding: '2px 0' }}>Date</th>
                <th style={{ padding: '2px 0' }}>Method</th>
                <th style={{ padding: '2px 0', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index}>
                  <td style={{ padding: '2px 0' }}>{tx.date}</td>
                  <td style={{ padding: '2px 0' }}>{tx.method}</td>
                  <td style={{ padding: '2px 0', textAlign: 'right' }}>{currencySymbol} {tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pos-footer" style={{ textAlign: 'center', fontSize: '10px', color: '#555', marginTop: '10px' }}>
          <p style={{ margin: '2px 0' }}>Thank you for your business!</p>
          <p style={{ margin: '2px 0' }}>Printed on: {printDate}</p>
        </div>
      </section>
    )
  }

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
