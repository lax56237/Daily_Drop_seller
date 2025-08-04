import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Seller.css';

function Seller() {
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch("http://daily-drop-backend.onrender.com/seller/details", {
            method: "GET",
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) throw new Error("Not Authenticated");
            return res.json();
        })
        .then(data => setDetails(data.details))
        .catch(() => navigate("/"));
    }, [navigate]);

    return (
        <div className="seller-dashboard">
            <div className="top-bar">
                <button onClick={() => navigate("/EditProfile")}>Edit Profile</button>
            </div>

            <div className="shop-info">
                <h1>{details?.shopName || "Your Shop"}</h1>
                <button className="product-btn" onClick={() => navigate("/Products")}>
                     Products
                </button>
                <button onClick={() => navigate("/orders")}>Orders</button>
                <button onClick={() => navigate("/verification")}>verification</button>
            </div>
        </div>
    );
}

export default Seller;
