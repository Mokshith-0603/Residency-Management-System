import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateMaintenancePDF = ({
  month,
  year,
  maintenanceBills,
  otherIncome,
  expenses,
  totals
}) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Maintenance Report - ${month}/${year}`, 14, 15);

  /* ------------------ Maintenance Income ------------------ */
  doc.setFontSize(12);
  doc.text("Maintenance Income", 14, 25);

  doc.autoTable({
    startY: 30,
    head: [["Name", "House", "Amount", "Status"]],
    body: maintenanceBills.map(b => [
      b.residents.name,
      b.residents.house_no,
      `₹ ${b.amount}`,
      b.status
    ])
  });

  /* ------------------ Other Income ------------------ */
  let y = doc.lastAutoTable.finalY + 10;
  doc.text("Other Income", 14, y);

  doc.autoTable({
    startY: y + 5,
    head: [["Title", "Amount", "Date"]],
    body: otherIncome.map(i => [
      i.title,
      `₹ ${i.amount}`,
      i.date
    ])
  });

  /* ------------------ Expenses ------------------ */
  y = doc.lastAutoTable.finalY + 10;
  doc.text("Expenses", 14, y);

  doc.autoTable({
    startY: y + 5,
    head: [["Title", "Amount", "Date"]],
    body: expenses.map(e => [
      e.title,
      `₹ ${e.amount}`,
      e.date
    ])
  });

  /* ------------------ Totals ------------------ */
  y = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(13);

  doc.text(`Total Income: ₹ ${totals.income}`, 14, y);
  doc.text(`Total Expenses: ₹ ${totals.expense}`, 14, y + 8);
  doc.text(
    `Balance: ₹ ${totals.income - totals.expense}`,
    14,
    y + 16
  );

  doc.save(`Maintenance_${month}_${year}.pdf`);
};
