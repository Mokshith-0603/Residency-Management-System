import { useEffect, useState } from "react";
import { getListings } from "../../services/listings.service";

export default function ResidentListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListings()
      .then(setListings)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading listings...</p>;

  if (listings.length === 0) {
    return <p>No listings available.</p>;
  }

  return (
    <div className="page">
      <h2>Listings</h2>

      <div className="listings-grid">
        {listings.map((l) => (
          <div key={l.id} className="listing-card">
            <div className="listing-image">
              🏠
            </div>

            <h3>{l.title}</h3>
            <p className="listing-desc">{l.description}</p>

            <div className="listing-contact">
              📞 {l.contact_number}
            </div>

            <div className="listing-footer">
              <span className="price">₹ {l.price}</span>
              <span className="badge">{l.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
