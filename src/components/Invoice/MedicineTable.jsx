function MedicineTable({ prescription, items, currencySymbol }) {
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
            <tr key={item.id}>
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
