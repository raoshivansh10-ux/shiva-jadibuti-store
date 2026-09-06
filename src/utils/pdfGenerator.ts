import { jsPDF } from "jspdf";
import { PRODUCTS } from "@/data/products";

export const generateProductCataloguePDF = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header Banner - Forest Green (#051F20)
  doc.setFillColor(13, 43, 29);
  doc.rect(0, 0, pageWidth, 42, "F");

  // Gold accent bar
  doc.setFillColor(218, 165, 32);
  doc.rect(0, 42, pageWidth, 3, "F");

  // Title & Subtitle in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("SHIVA JADIBUTI STORE", 14, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(230, 240, 235);
  doc.text("Wholesale Supplier & Trader of Natural Herbs, Medicinal Plants & Raw Ingredients", 14, 25);
  doc.text("Ayurvedic & Homeopathic Raw Material Catalog | India", 14, 31);

  // Contact Info Top Right
  doc.setFontSize(9);
  doc.text("Web: www.shivajadibutistore.com", pageWidth - 14, 18, { align: "right" });
  doc.text("Email: info@shivajadibutistore.com", pageWidth - 14, 24, { align: "right" });
  doc.text("Phone: +91 99588 33536", pageWidth - 14, 30, { align: "right" });

  // Document Title
  let y = 54;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(13, 43, 29);
  doc.text("WHOLESALE PRODUCT CATALOGUE (BULK SUPPLY)", 14, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth - 14, y, { align: "right" });

  y += 8;

  // Table Headers
  doc.setFillColor(30, 82, 56); // Emerald Green
  doc.rect(14, y, pageWidth - 28, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("Product Name", 18, y + 5.5);
  doc.text("Botanical Name", 65, y + 5.5);
  doc.text("Category", 115, y + 5.5);
  doc.text("Bulk Availability", 155, y + 5.5);

  y += 8;

  // Table Rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);

  PRODUCTS.forEach((product, index) => {
    // Check page space
    if (y > pageHeight - 20) {
      doc.addPage();
      y = 20;

      // Header on new page
      doc.setFillColor(30, 82, 56);
      doc.rect(14, y, pageWidth - 28, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("Product Name", 18, y + 5.5);
      doc.text("Botanical Name", 65, y + 5.5);
      doc.text("Category", 115, y + 5.5);
      doc.text("Bulk Availability", 155, y + 5.5);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
    }

    // Zebra striping
    if (index % 2 === 0) {
      doc.setFillColor(249, 246, 240);
      doc.rect(14, y, pageWidth - 28, 10, "F");
    }

    doc.setTextColor(20, 35, 25);
    doc.setFont("helvetica", "bold");
    doc.text(product.name, 18, y + 6);
    
    doc.setFont("helvetica", "italic");
    doc.setTextColor(70, 70, 70);
    doc.text(product.botanicalName, 65, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text(product.category, 115, y + 6);
    
    doc.setTextColor(30, 100, 60);
    doc.setFont("helvetica", "bold");
    doc.text(product.bulkAvailability, 155, y + 6);

    // Subtle line border
    doc.setDrawColor(230, 230, 230);
    doc.line(14, y + 10, pageWidth - 14, y + 10);

    y += 10;
  });

  // Footer on last page
  y = Math.min(y + 12, pageHeight - 15);
  doc.setFillColor(13, 43, 29);
  doc.rect(0, pageHeight - 14, pageWidth, 14, "F");
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(240, 240, 240);
  doc.text("Shiva Jadibuti Store | Wholesale Herbal Ingredients Supplier | All Rights Reserved", 14, pageHeight - 6);
  doc.text("For custom bulk orders & samples: sales@shivajadibutistore.com", pageWidth - 14, pageHeight - 6, { align: "right" });

  // Save File
  doc.save("Shiva_Jadibuti_Store_Product_Catalogue.pdf");
};
