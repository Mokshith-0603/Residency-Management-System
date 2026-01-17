// src/utils/upi.js
// Replace UPI ID if needed

export const generateUPILink = ({
  amount,
  residentName,
  month,
  year
}) => {
  const numericAmount = Number(amount);

  const note = `Maintenance ${month}/${year} - ${residentName}`;
  const txnRef = `MTN-${month}${year}-${Date.now()}`;

  return `upi://pay?pa=9141781065-2@ybl` +
    `&pn=${encodeURIComponent("Residence Management")}` +
    `&am=${numericAmount}` +
    `&tn=${encodeURIComponent(note)}` +
    `&tr=${encodeURIComponent(txnRef)}` +
    `&cu=INR`;
};
