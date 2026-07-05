import jsPDF from "jspdf";

/**
 * ইমেজ ছাড়া সরাসরি HTML কে রাইট সাইড কাটিং, ব্ল্যাক ব্যাকগ্রাউন্ড এবং ফন্ট গ্লিচ ছাড়া পিডিএফে রূপান্তর করার ফাংশন
 * @param {HTMLElement} element - ইনভয়েস শিট এলিমেন্ট
 */
export async function generateInvoicePdf(element) {
  if (!element) {
    throw new Error("No element provided.");
  }

  
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = pdf.internal.pageSize.getWidth(); // A4 = 210mm
  const margin = 5; 
  const printableWidth = pageWidth - (margin * 2);

  try {
    // 3. JS pdf directed Excuted to .html() 
    await pdf.html(element, {
      x: margin,
      y: margin,
      html2canvas: {
        width: 794,         
        windowWidth: 794,   
        scale: printableWidth / 794, 
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff" 
      },
      autoPaging: 'text',
      callback: function (doc) {
        
        const totalPages = doc.internal.getNumberOfPages();
        if (totalPages > 1) {
          for (let i = totalPages; i > 1; i--) {
            doc.deletePage(i);
          }
        }
      }
    });

   
    pdf.autoPrint();

    const blob = pdf.output("blob");
    return URL.createObjectURL(blob);

  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
}