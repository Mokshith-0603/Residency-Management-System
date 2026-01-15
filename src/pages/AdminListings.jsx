import { useEffect, useState } from "react";
import {
  getListings,
  createListing,
  deleteListing,
} from "../services/listings.service";

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  /* =========================
     FORM STATE
  ========================== */
  const [form, setForm] = useState({
    title: "",
    type: "RENT",
    price: "",
    contact: "",
    description: "",
  });

  /* =========================
     LOAD LISTINGS
  ========================== */
  const loadListings = async () => {
    setLoading(true);
    try {
      const data = await getListings();
      setListings(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  /* =========================
     CREATE LISTING
  ========================== */
  const handleCreate = async () => {
    if (
      !form.title ||
      !form.price ||
      !form.contact
    ) {
      alert("Please fill required fields");
      return;
    }

    setCreating(true);
    try {
      await createListing(form);
      setForm({
        title: "",
        type: "RENT",
        price: "",
        contact: "",
        description: "",
      });
      loadListings();
    } catch (err) {
      alert(err.message || "Failed to create listing");
    } finally {
      setCreating(false);
    }
  };

  /* =========================
     DELETE LISTING
  ========================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await deleteListing(id);
    loadListings();
  };

  /* =========================
     UI
  ========================== */
  return (
    <div className="dashboard-wrapper">
      <h1>Listings</h1>

      {/* ================= CREATE FORM ================= */}
      <div className="card form-card">
        <h3>Create Listing</h3>

        <div className="form-grid">
          <input
            placeholder="Title (e.g. 2-BHK) *"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="RENT">For Rent</option>
            <option value="SALE">For Sale</option>
          </select>

          <input
            placeholder="Price *"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            placeholder="Contact Number *"
            value={form.contact}
            onChange={(e) =>
              setForm({ ...form, contact: e.target.value })
            }
          />

          <textarea
            rows="3"
            placeholder="Description / Amenities"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <button
          className="primary-btn"
          onClick={handleCreate}
          disabled={creating}
        >
          {creating ? "Creating..." : "Add Listing"}
        </button>
      </div>

      {/* ================= LISTINGS ================= */}
      {loading ? (
        <p>Loading...</p>
      ) : listings.length === 0 ? (
        <p>No listings found</p>
      ) : (
        <div className="listing-grid">
          {listings.map((l) => (
            <div key={l.id} className="listing-card">
              <div className="listing-image">🏠</div>

              <h3 className="listing-title">{l.title}</h3>

              {l.description && (
                <p className="listing-desc">{l.description}</p>
              )}

              <div className="listing-contact">
                📞 {l.contact}
              </div>

              <div className="listing-footer">
                <span className="listing-price">
                  ₹ {l.price}
                </span>
                <span className="listing-badge">
                  {l.type}
                </span>
              </div>

              <button
                className="delete-btn"
                onClick={() => handleDelete(l.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
