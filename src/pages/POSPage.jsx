import React, { useState, useRef } from "react";
// ১. আপনার সেই বিদ্যমান POSInvoice কম্পোনেন্টটি ইম্পোর্ট করলেন (পাথ মিলিয়ে)
import POSInvoice from "../components/Invoice/POSInvoice.jsx"; 
// ২. আপনার তৈরি করা সেই সলিড পিডিএফ জেনারেটর ইম্পোর্ট করলেন
import { generateInvoicePdf } from "../utils/pdfGenerator.js"; 

function POSPage() {
  // কার্ট স্টেট (লাইভ আইটেম যোগ/বিয়োগের জন্য)
  const [cartItems, setCartItems] = useState([
    { id: 1, description: "V233852-5 TITAN METAL", qty: 1, price: 930.00, tax: 0, total: 930.00 },
    { id: 2, description: "Lens", qty: 1, price: 800.00, tax: 0, total: 800.00 }
  ]);
  
  // কাস্টমার স্টেট
  const [customer, setCustomer] = useState({ name: "MD.IBRAHIM", phone: "01948498557", address: "B.BARIA" });
  const [isPrinting, setIsPrinting] = useState(false);

  // পিডিএফ প্রিন্ট করার জন্য ডম রেফারেন্স
  const printInvoiceRef = useRef(null);

  // লাইভ সাবটোটাল হিসাব
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // চেকআউট এবং ডিরেক্ট পিডিএফ প্রিন্ট ফাংশন
  const handleCheckoutAndPrint = async () => {
    setIsPrinting(true);
    try {
      if (printInvoiceRef.current) {
        // আপনার সেই জাদুকরী HTML-to-PDF ফাংশন ট্রিগার হবে
        const url = await generateInvoicePdf(printInvoiceRef.current);
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("PDF printing failed:", error);
    } finally {
      setIsPrinting(false);
    }
  };

  // আপনার POSInvoice.jsx যে ফরম্যাটে ডেটা রিসিভ করে, হুবহু সেই অবজেক্ট স্ট্রাকচার
  const invoiceDataForPrint = {
    company: {
      name: "Vision Eye Hospital Pvt. Ltd.",
      address: "229, Green Road, Dhaka, Bangladesh",
      contact: "01988815708 | optics@visioneyebd.org"
    },
    billingTo: {
      name: customer.name,
      phone: customer.phone,
      address: customer.address
    },
    summary: {
      invoiceNumber: "50649",
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      currencySymbol: "৳" // এটি পিডিএফে অটো BDT হবে, পরে আবার ৳ হয়ে যাবে
    },
    prescription: {
      right: { sph: "-1.00", cyl: "", axis: "", av: "CF 2" },
      left: { sph: "-1.00", cyl: "", axis: "", av: "CF 2" }
    },
    items: cartItems,
    totals: {
      subtotal: subtotal,
      discount: 0,
      taxes: 0,
      totalAmount: subtotal,
      paidAmount: subtotal,
      dueAmount: 0
    },
    transactions: [
      { date: new Date().toISOString().split('T')[0], method: "Cash", amount: subtotal }
    ]
  };

  return (
    <div className="invoice-page">
      {/* POS এর মেইন কন্ট্রোল বা বাটন এরিয়া */}
      <div className="pos-controls" style={{ marginBottom: "25px", textAlign: "center" }}>
        <h2 style={{ color: "#1e293b", marginBottom: "10px" }}>Point of Sale (POS) Dashboard</h2>
        <div className="print-actions">
          <button type="button" onClick={handleCheckoutAndPrint} disabled={isPrinting}>
            {isPrinting ? "Generating PDF..." : "Checkout & Print Invoice"}
          </button>
        </div>
      </div>

      {/* স্ক্রিনে ইনভয়েস শিটটি লাইভ দেখানোর জন্য প্যারেন্ট কন্টেইনার */}
      <div className="pos-invoice">
        <POSInvoice ref={printInvoiceRef} invoice={invoiceDataForPrint} />
      </div>
    </div>
  );
}

export default POSPage;