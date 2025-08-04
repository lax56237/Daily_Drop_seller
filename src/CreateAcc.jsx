import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './CreateAcc.css';

function CreateAcc() {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    return (
        <>
            <form>
                <input type="email" placeholder="enter you email" onChange={(e) => { setusername(e.target.value) }} />
                <br />
                <input type="password" placeholder="enter you password" onChange={(e) => { setpassword(e.target.value) }} />
                <br />

                <button type="button" onClick={async () => {
                    const res = await fetch("http://http://daily-drop-backend.onrender.com//seller/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({ username, password })
                    });
                    const data = await res.json();
                    localStorage.setItem("sellerId", data._id);
                    navigate("/CreateSeller");
                }}>Create Account</button>

            </form>
        </>
    )
}
export default CreateAcc