import { useEffect, useState } from "react";
import { getWishlist } from "../../services/wishlist.service";

export default function ResidentWishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWishlist()
      .then((data) => setItems(data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h2>Wishlist</h2>

      {loading ? (
        <p>Loading wishlist...</p>
      ) : items.length === 0 ? (
        <p>No wishlist items available.</p>
      ) : (
        <div className="listings-grid">
          {items.map((item) => (
            <div key={item.id} className="listing-card">
              <div className="listing-image">⭐</div>

              <h3>{item.product_name}</h3>

              <div className="listing-footer">
                <span className="price">₹ {item.approx_cost}</span>
                <span className="badge">{item.priority}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
