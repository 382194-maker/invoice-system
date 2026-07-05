function MedicineTable({ prescription, items, currencySymbol, isPosMode }) {
  if (isPosMode) {
    return (
      <section className="invoice-tables">
        <table className="items-table pos-items-table" style={{ width: '100%', fontSize: '11px', textAlign: 'left', marginTop: '10px', borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th style={{ padding: '4px 0', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '4px 0', textAlign: 'center' }}>Qty</th>
              <th style={{ padding: '4px 0', textAlign: 'right' }}>Price</th>
              <th style={{ padding: '4px 0', textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: '4px 0' }}>
                  {item.description.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </td>
                <td style={{ padding: '4px 0', textAlign: 'center' }}>{item.qty}</td>
                <td style={{ padding: '4px 0', textAlign: 'right' }}>{item.price}</td>
                <td style={{ padding: '4px 0', textAlign: 'right' }}>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }

  return (
    <section className="invoice-tables">
      {/* Prescription / Power table */}
      <table className="prescription-table">
        <thead>
          <tr>
            <th>Power</th>
            <th>Sph</th>
            <th>Cyl</th>
            <th>Axis</th>
            <th>AV</th>
          </tr>
        </thead>
        <tbody>
          {prescription.rows.map((row) => (
            <tr key={row.power}>
              <td className="row-label">{row.power}</td>
              <td>{row.sph}</td>
              <td>{row.cyl}</td>
              <td>{row.axis}</td>
              <td>{row.av}</td>
            </tr>
          ))}
          <tr>
            <td />
            <td className="row-label">{prescription.extra.add}</td>
            <td />
            <td className="row-label">{prescription.extra.ipd}</td>
            <td>{prescription.extra.pdm}</td>
          </tr>
        </tbody>
      </table>

      {/* Items table */}
      <table className="items-table">
        <thead>
          <tr>
            <th className="col-desc">Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id || index}>
              <td className="col-desc">
                <span className="item-index">{index + 1}.</span>
                <span className="item-desc">
                  {item.description.map((line) => (
                    <span key={line} className="item-desc-line">
                      {line}
                    </span>
                  ))}
                </span>
              </td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{item.tax}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default MedicineTable
