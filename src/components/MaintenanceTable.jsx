import { generateUPILink } from "../utils/upi";
import {
  markPaymentInitiated,
  confirmPaymentReceived,
  markCashPaid
} from "../services/maintenance.service";

export default function MaintenanceTable({ bills, reload }) {
  return (
    <div className="section-card">
      <h3>Maintenance Bills</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>House</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bills.length === 0 && (
            <tr>
              <td colSpan="5">No bills generated</td>
            </tr>
          )}

          {bills.map(b => (
            <tr key={b.id}>
              <td>{b.residents.name}</td>
              <td>{b.residents.house_no}</td>
              <td>₹ {b.amount}</td>
              <td>{b.status}</td>
              <td>
                {b.status === "UNPAID" && (
                  <>
                    <a
                      className="btn btn-primary"
                      href={generateUPILink({
                        amount: b.amount,
                        residentName: b.residents.name,
                        month: b.month,
                        year: b.year
                      })}
                      onClick={async () => {
                        await markPaymentInitiated(b.id);
                        reload();
                      }}
                    >
                      Pay Now
                    </a>{" "}
                    <button
                      className="btn btn-secondary"
                      onClick={async () => {
                        await markCashPaid(b.id);
                        reload();
                      }}
                    >
                      Cash
                    </button>
                  </>
                )}

                {b.status === "PAYMENT_INITIATED" && (
                  <button
                    className="btn btn-primary"
                    onClick={async () => {
                      await confirmPaymentReceived(b.id);
                      reload();
                    }}
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
