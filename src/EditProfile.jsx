import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        shopName: '',
        phone: '',
        pincode: '',
        address: '',
        city: '',
        state: '',
        landmark: ''
    });

    useEffect(() => {

        fetch("http://daily-drop-backend.onrender.com/seller/details", {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setDetails({
                    shopName: data.details?.shopName || '',
                    phone: data.details?.phone || '',
                    pincode: data.details?.pincode || '',
                    address: data.details?.address || '',
                    city: data.details?.city || '',
                    state: data.details?.state || '',
                    landmark: data.details?.landmark || ''
                });
            })
            .catch(() => navigate('/'));
    }, [navigate]);

    const handleSubmit = async () => {
        for (let key in details) {
            if (!details[key]) {
                alert(`${key} cannot be empty`);
                return;
            }
        }

        const res = await fetch("http://daily-drop-backend.onrender.com/seller/update-detail", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(details)
        });

        if (res.ok) {
            navigate("/Seller");
        } else {
            alert("Update failed");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Edit Profile</h1>
            <input type="text" value={details.shopName} placeholder="Shop Name" onChange={e => setDetails({ ...details, shopName: e.target.value })} /><br />
            <input type="text" value={details.phone} placeholder="Phone" onChange={e => setDetails({ ...details, phone: e.target.value })} /><br />
            <input type="text" value={details.pincode} placeholder="Pincode" onChange={e => setDetails({ ...details, pincode: e.target.value })} /><br />
            <input type="text" value={details.address} placeholder="Address" onChange={e => setDetails({ ...details, address: e.target.value })} /><br />
            <input type="text" value={details.city} placeholder="City" onChange={e => setDetails({ ...details, city: e.target.value })} /><br />
            <input type="text" value={details.state} placeholder="State" onChange={e => setDetails({ ...details, state: e.target.value })} /><br />
            <input type="text" value={details.landmark} placeholder="Landmark" onChange={e => setDetails({ ...details, landmark: e.target.value })} /><br />
            <button onClick={handleSubmit}>Update</button>
        </div>
    );
}

export default EditProfile;
