import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  /* Maintenance */
  doc.setFontSize(12);
  doc.text("Maintenance Income", 14, 25);

  autoTable(doc, {
    startY: 30,
    head: [["Name", "House", "Amount", "Status"]],
    body: maintenanceBills.map(b => [
      b.name ?? "—",
      b.house_no ?? "—",
      `Rs. ${b.amount}`,
      b.status
    ])
  });

  /* Other income */
  let y = doc.lastAutoTable.finalY + 10;
  doc.text("Other Income", 14, y);

  autoTable(doc, {
    startY: y + 5,
    head: [["Title", "Amount", "Date"]],
    body: otherIncome.map(i => [
      i.title,
      `Rs. ${i.amount}`,
      i.date ?? "-"
    ])
  });

  /* Expenses */
  y = doc.lastAutoTable.finalY + 10;
  doc.text("Expenses", 14, y);

  autoTable(doc, {
    startY: y + 5,
    head: [["Title", "Amount", "Date"]],
    body: expenses.map(e => [
      e.title,
      `Rs. ${e.amount}`,
      e.date ?? "-"
    ])
  });

  /* Totals */
  y = doc.lastAutoTable.finalY + 15;

  doc.text(`Total Income: Rs. ${totals.income}`, 14, y);
  doc.text(`Total Expenses: Rs. ${totals.expense}`, 14, y + 8);
  doc.text(`Balance: Rs. ${totals.income - totals.expense}`, 14, y + 16);

  doc.save(`Maintenance_${month}_${year}.pdf`);
};