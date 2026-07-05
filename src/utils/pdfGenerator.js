// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// export async function generateInvoicePdf(element) {
//   if (!element) {
//     throw new Error("No element provided.");
//   }

//   // 1. html2canvas configuration (Pure White Background )  i made it with enfore.
//   const canvas = await html2canvas(element, {
//     scale: 2, 
//     useCORS: true,
//     backgroundColor: "#ffffff",
//     scrollY: 0,
//     scrollX: 0,
//     windowWidth: 794, // উইডথ লক যাতে ডানপাশ না কাটে
//   });

//   const imgData = canvas.toDataURL("image/png");

//   const pdf = new jsPDF({
//     orientation: "portrait",
//     unit: "mm",
//     format: "a4",
//   });

//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const pageHeight = pdf.internal.pageSize.getHeight();

//   const margin = 5; 

//   const printableWidth = pageWidth - margin * 2;
//   const printableHeight = pageHeight - margin * 2;

//   let imgHeight = (canvas.height * printableWidth) / canvas.width;

//   // Single Page lock  
//   if (imgHeight > printableHeight) {
//     imgHeight = printableHeight; 
//   }











//   pdf.addImage(
//     imgData,
//     "PNG",
//     margin,
//     margin,
//     printableWidth,
//     imgHeight
//   );

//   // auto-print dialog modal
//   pdf.autoPrint();

//   const blob = pdf.output("blob");

//   return URL.createObjectURL(blob);
// }



// import jsPDF from "jspdf";

// /**
//  * @param {HTMLElement} element - 
//  */
// export async function generateInvoicePdf(element) {
//   if (!element) {
//     throw new Error("No element provided.");
//   }

//   const pdf = new jsPDF({
//     orientation: "portrait",
//     unit: "mm",
//     format: "a4"
//   });

//   const pageWidth = pdf.internal.pageSize.getWidth(); // A4 = 210mm
//   const margin = 5; // 
//   const printableWidth = pageWidth - (margin * 2); // 

//   // ২. jsPDF এর ডিরেক্ট .html() মেথড উইথ পারফেক্ট কনফিগারেশন
//   await pdf.html(element, {
//     x: margin,
//     y: margin,
//     html2canvas: {
//       width: 794,        
//       windowWidth: 794,   
//       scale: printableWidth / 794, 
//       useCORS: true,
//       logging: false,
//       backgroundColor: "#ffffff", 
//       removeContainer: true
//     },
//     autoPaging: 'text',
//     callback: function (doc) {
//       const totalPages = doc.internal.getNumberOfPages();
//       if (totalPages > 1) {
//         for (let i = totalPages; i > 1; i--) {
//           doc.deletePage(i);
//         }
//       }
//     }
//   });


//   pdf.autoPrint();

//   const blob = pdf.output("blob");
//   return URL.createObjectURL(blob);
// }














import jsPDF from "jspdf";

/**
 * ইমেজ ছাড়া সরাসরি HTML কে রাইট সাইড কাটিং, ব্ল্যাক ব্যাকগ্রাউন্ড এবং ফন্ট গ্লিচ ছাড়া পিডিএফে রূপান্তর করার ফাংশন
 * @param {HTMLElement} element - ইনভয়েস শিট এলিমেন্ট
 */
export async function generateInvoicePdf(element) {
  if (!element) {
    throw new Error("No element provided.");
  }
  const originalHtml = element.innerHTML;
  element.innerHTML = element.innerHTML.replace(/৳/g, "BDT");

  
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

  } finally {
    element.innerHTML = originalHtml;
  }
}