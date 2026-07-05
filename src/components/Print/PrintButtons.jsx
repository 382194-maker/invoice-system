import { useState } from "react";

import { generateInvoicePdf } from "../../utils/pdfGenerator.js";
import { generatePOSPdf } from "../../utils/generatePOSPdf.js";

import { openInNewTab } from "../../utils/printHelper.js";

function PrintButtons({ targetRef }) {

  const [busy, setBusy] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handlePrint = async (type) => {

    if (!targetRef?.current) return;

    try {

      setBusy(true);

      setShowOptions(false);

      let url;

      if (type === "POS") {

        targetRef.current.classList.add("pos-printer-mode");

        url = await generatePOSPdf(targetRef.current);

      } else {

        targetRef.current.classList.remove("pos-printer-mode");

        url = await generateInvoicePdf(targetRef.current);

      }

      openInNewTab(url);

    } catch (error) {

      console.log(error);

    } finally {

      targetRef.current.classList.remove("pos-printer-mode");

      setBusy(false);

    }

  };

  return (

    <div
      className="print-actions-wrapper"
      style={{
        position: "relative",
        display: "inline-block"
      }}
    >

      <button
        type="button"
        className="main-print-btn"
        disabled={busy}
        onClick={() => setShowOptions(!showOptions)}
      >

        {busy ? "Generating..." : "Print / Download PDF ▾"}

      </button>

      {showOptions && (

        <div className="print-dropdown-menu">

          <button
            type="button"
            onClick={() => handlePrint("A4")}
          >
            📄 A4 Size
          </button>

          <button
            type="button"
            onClick={() => handlePrint("POS")}
          >
            🧾 POS Receipt (80mm)
          </button>

        </div>

      )}

    </div>

  );

}

export default PrintButtons;