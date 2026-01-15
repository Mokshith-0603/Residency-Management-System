import { useEffect, useState } from "react";
import {
  getWishlist,
  addWishlistItem,
  deleteWishlistItem,
} from "../services/wishlist.service";

export default function AdminWishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    product_name: "",
    priority: "Medium",
    approx_cost: "",
  });

  /* ================= LOAD ================= */
  const loadWishlist = async () => {
    setLoading(true);
    try {
      const data = await getWishlist();
      setItems(data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  /* ================= ADD ================= */
  const handleAdd = async () => {
    if (!form.product_name || !form.approx_cost) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addWishlistItem({
        product_name: form.product_name,
        priority: form.priority,
        approx_cost: Number(form.approx_cost),
      });

      setForm({ product_name: "", priority: "Medium", approx_cost: "" });
      loadWishlist();
    } catch (err) {
      console.error(err);
      alert("Failed to add item");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteWishlistItem(id);
    loadWishlist();
  };

  return (
    <div className="dashboard-wrapper">
      <h1>Wishlist</h1>

      {/* ================= FORM ================= */}
      <div className="card form-card">
        <h3>Add Wishlist Item</h3>

        <div className="form-grid">
          <input
            placeholder="Product name"
            value={form.product_name}
            onChange={(e) =>
              setForm({ ...form, product_name: e.target.value })
            }
          />

          <select
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="number"
            placeholder="Approx Cost"
            value={form.approx_cost}
            onChange={(e) =>
              setForm({ ...form, approx_cost: e.target.value })
            }
          />
        </div>

        <button className="primary-btn" onClick={handleAdd}>
          Add Item
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="card">
        <h3>Wishlist Items</h3>

        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No wishlist items</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Priority</th>
                <th>Approx Cost</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.product_name}</td>
                  <td>{item.priority}</td>
                  <td>₹ {item.approx_cost}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
