import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const { user } = useContext(AuthContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProp, setEditingProp] = useState(null);
  
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [filters, setFilters] = useState({
    type: "all",
    rooms: "all",
    category: "all",
    status: "all"
  });

  const [visibleContacts, setVisibleContacts] = useState({});

  useEffect(() => {
    const fetchProps = async () => {
      const res = await axios.get("http://localhost:5000/api/properties");
      setProperties(res.data);
      setFiltered(res.data);
    };
    fetchProps();
  }, []);

  useEffect(() => {
    let temp = [...properties];
    
    // Search
    if (search) {
      temp = temp.filter(p => 
        p.address.area.toLowerCase().includes(search.toLowerCase()) // .includes() This is a partial match search. If the user types "M" it will find "Manhattan"
      );
    }

    if (filters.type !== "all") temp = temp.filter(p => p.type === filters.type);
    if (filters.status !== "all") temp = temp.filter(p => p.status === filters.status);

    if (sort === "low") temp.sort((a, b) => a.price - b.price);
    if (sort === "high") temp.sort((a, b) => b.price - a.price);

    setFiltered(temp);
  }, [search, filters, sort, properties]);

  const handleContact = (id) => {
    if (!user) return alert("Please Login to view contact");
    setVisibleContacts(prev => ({ ...prev, [id]: true }));
  };

  const handleDelete = async (id) => {
    if(confirm("Are you sure?")) {
      await axios.delete(`http://localhost:5000/api/properties/${id}`);
      window.location.reload();
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/properties/${editingProp._id}`, editingProp);
      alert("Property updated successfully!");
      setIsEditModalOpen(false);
      window.location.reload();
    } catch (err) {
      alert("Error updating property");
    }
  };

  return (
    <div className="container">
      <div className="filter-bar">
        <input className="search-bar" placeholder="Search by Area" onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
        <select onChange={(e) => setFilters({...filters, type: e.target.value})}>
            <option value="all">Type</option><option value="Villa">Villa</option><option value="Flat">Flat</option><option value="Plot">Plot</option><option value="Penthouse">Penthouse</option><option value="Apartment">Apartment</option><option value="Shop">Shop</option><option value="Tenament">Tenament</option><option value="Bungalow">Bungalow</option>
        </select>
        <select onChange={(e) => setFilters({...filters, status: e.target.value})}>
            <option value="all">Status</option>
            <option value="Ready to Move">Ready to Move</option><option value="Under Construction">Under Construction</option>
        </select>
      </div>

      <div className="grid">
        {filtered.map(p => (
          <div className="card" key={p._id}>
            <img src={p.photos[0]} alt="Property" className="card-img" />
            <div className="card-content">
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <h3>{p.rooms}BHK {p.type} in {p.address.area}</h3>
              </div>
              
              <span className="price">{p.price<10000000?(p.price)/100000:(p.price)/10000000}

                  {p.price<10000000?"Lakhs":"Crs"}</span>
              <div style={{marginTop:'10px'}}>
                <span className="badge">{p.status}</span>
                <span className="badge">{p.areaSize} sqft</span>
              </div>
              
              <div style={{marginTop: '15px', display:'flex', gap:'10px'}}>
                {visibleContacts[p._id] ? (
                  <button className="btn btn-secondary" style={{flex:1}}>{p.userId.phone}</button>
                ) : (
                  <button className="btn btn-primary" style={{flex:1}} onClick={() => handleContact(p._id)}>View Contact</button>
                )}
              </div>
              <div style={{display:'flex', justifyContent:'space-around', marginTop:"10px"}}>
                {user && user._id === p.userId._id && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => { setEditingProp(p); setIsEditModalOpen(true); }} 
                      style={{ color: '#2563eb', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Edit
                    </button>
                  </div>
                )}
                {user && user._id === p.userId._id && (
                    <button onClick={() => handleDelete(p._id)} style={{color:'red', border:'none', background:'none', cursor:'pointer'}}>Delete</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isEditModalOpen && editingProp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Property</h3>
            <form onSubmit={handleUpdate}>
              <label>Price</label>
              <input 
                type="number" 
                min="1000000" step="1000000" max="9999999999"
                defaultValue={editingProp.price} 
                onChange={(e) => setEditingProp({...editingProp, price: e.target.value})} 
              />
              
              <label>Rooms</label>
              <input 
                type="number" 
                min="1" max="10"
                defaultValue={editingProp.rooms} 
                onChange={(e) => setEditingProp({...editingProp, rooms: e.target.value})} 
              />

              <label>Area Size</label>
              <input 
                type="number" 
                min="100" step="100"
                defaultValue={editingProp.areaSize} 
                onChange={(e) => setEditingProp({...editingProp, areaSize: e.target.value})} 
              />

              <label>Status</label>
              <select 
                defaultValue={editingProp.status} 
                onChange={(e) => setEditingProp({...editingProp, status: e.target.value})}
              >
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
              </select>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  style={{ flex: 1 }} 
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}