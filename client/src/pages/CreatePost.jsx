import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    photos: "", rooms: "", price: "", type: "Flat", category: "Residential",
    areaSize: "", status: "Ready to Move", area: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/properties", {
        ...form,
        photos: [form.photos],
        userId: user._id,
        address: { area: form.area }
      });
      navigate("/");
    } catch (err) { alert("Error creating post"); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="container" style={{maxWidth: '600px'}}>
      <h2>Post Property</h2>
      <form onSubmit={handleSubmit}>
        <input name="photos" placeholder="Photo URL (Required)" required onChange={handleChange} />
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
          <div>BHK<input name="rooms" type="number" min="1" max="10" placeholder="Rooms (e.g. 2bhk)" required onChange={handleChange} /></div>
          <div>Price<input name="price" type="number" min="1000000" step="1000000" max="9999999999" placeholder="Price" required onChange={handleChange} /></div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
           <div>Type<select name="type" onChange={handleChange}>
             <option value="Flat">Flat</option><option value="Villa">Villa</option><option value="Plot">Plot</option>
             <option value="Penthouse">Penthouse</option><option value="Apartment">Apartment</option><option value="Shop">Shop</option>
             <option value="Tenament">Tenament</option><option value="Bungalow">Bungalow</option>
           </select></div>
           <div>Area Size<input name="areaSize" type="number" min="100" step="100" placeholder="Size (sqft)" required onChange={handleChange} /></div>
        </div>
        <select name="status" onChange={handleChange}>
            <option value="Ready to Move">Ready to Move</option><option value="Under Construction">Under Construction</option>
        </select>
        <h4>Address</h4>
        <input name="area" placeholder="Area" required onChange={handleChange} />
        <button type="submit" className="btn btn-primary" style={{marginTop:'20px', width:'100%'}}>Create Listing</button>
      </form>
    </div>
  );
}