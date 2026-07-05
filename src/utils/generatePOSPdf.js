import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * 100% Guaranteed Single Page POS Receipt PDF
 * Bypasses jsPDF's automatic page-breaking bug completely.
 */
export async function generatePOSPdf(element) {
  if (!element) {
    throw new Error("No element provided.");
  }

  // 1.orginal data and class backup
  const wasPosPrinterMode = element.classList.contains("pos-printer-mode");

  if (!wasPosPrinterMode) {
    element.classList.add("pos-printer-mode");
  }

  // ২. রানটাইমে উইডথ ৩২০ পিক্সেল লক (যাতে কন্টেন্ট ছড়িয়ে না যায়)
  const originalStyle = element.getAttribute("style") || "";
  element.setAttribute("style", originalStyle + "; width: 320px !important; max-width: 320px !important; display: block !important;");

  try {
    const RECEIPT_WIDTH = 80; // mm
    const PX_TO_MM = 0.264583;

    // ৩. html2canvas দিয়ে পুরো ডম-কে ১টি সিঙ্গেল ক্যানভাসে লক করা (এখানেই পেজ ব্রেক হওয়া বন্ধ হয়)
    const canvas = await html2canvas(element, {
      scale: 2.5, // টেক্সট এবং টেবিল একদম ক্রিস্টাল ক্লিয়ার দেখানোর জন্য
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 320,
      windowWidth: 320
    });

    const imgData = canvas.toDataURL("image/png");

    // ৪. ক্যানভাসের হাইট থেকে নিখুঁত মিলিমিটার সাইজ বের করা
    const imgHeightMm = (canvas.height * RECEIPT_WIDTH) / canvas.width;
    const finalPageHeight = imgHeightMm + 8; // নিচের দিকে কিছু এক্সট্রা সেফটি মার্জিন

    // ৫. ১টি মাত্র সিঙ্গেল লং-রোল পেজের পিডিএফ অবজেক্ট তৈরি
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [RECEIPT_WIDTH, finalPageHeight]
    });

    // ৬. এই নির্দিষ্ট সাইজের পেজে ইমেজটি পারফেক্টলি পুশ করা
    pdf.addImage(
      imgData,
      "PNG",
      0,
      4, // টপ মার্জিন
      RECEIPT_WIDTH,
      imgHeightMm
    );

    // ৭. অটো-প্রিন্ট ডায়ালগ এবং ব্লব ইউআরএল রিটার্ন
    pdf.autoPrint();
    const blob = pdf.output("blob");
    return URL.createObjectURL(blob);

  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  } finally {
    // 8. Restore DOM
    if (!wasPosPrinterMode) {
      element.classList.remove("pos-printer-mode");
    }
    element.setAttribute("style", originalStyle);
  }
}