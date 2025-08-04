import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateSeller() {
    const navigate = useNavigate();
    const [shopName, setShopName] = useState('');
    const [phone, setPhone] = useState('');
    const [pincode, setPincode] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [landmark, setLandmark] = useState('');

    const handleCreate = async () => {
        const sellerId = localStorage.getItem("sellerId");
        const res = await fetch("http://daily-drop-backend.onrender.com/seller/register-detail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sellerId,
                shopName,
                phone,
                pincode,
                address,
                city,
                state,
                landmark
            })
        });
        const data = await res.json();
        console.log("Seller detail created:", data);
        navigate("/Seller");
    };

    return (
        <>
            <h1>Create Seller Page</h1>
            <input type="text" placeholder='Enter Shop name' onChange={e => setShopName(e.target.value)} /><br />
            <label>Shop Address:</label><br />
            <input type="text" placeholder='Enter Phone Number' onChange={e => setPhone(e.target.value)} /><br />
            <input type="text" placeholder='Pincode' onChange={e => setPincode(e.target.value)} /><br />
            <input type="text" placeholder='Address (Area or Street)' onChange={e => setAddress(e.target.value)} /><br />
            <input type="text" placeholder='City' onChange={e => setCity(e.target.value)} /><br />
            <input type="text" placeholder='State' onChange={e => setState(e.target.value)} /><br />
            <input type="text" placeholder='Landmark' onChange={e => setLandmark(e.target.value)} /><br />
            <button type="button" onClick={handleCreate}>Create Seller</button>
        </>
    );
}
export default CreateSeller;
