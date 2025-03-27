import React, { useState } from 'react'
import { url } from '../../api';

const Login = ({ showWelcomeHandiler }) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
            const response = await fetch(`${url}/vendor/login`, options)
            const data = await response.json()

            if (response.ok) {
                alert("login successfull")
                localStorage.setItem("jwt", data.token)
                setemail("")
                setpassword("")
                showWelcomeHandiler()
                console.log(data)
            }
            const vendorId = data.vendorId
            const vendorResponse = await fetch(`${url}/vendor/single-vendor/${vendorId}`)
            window.location.reload()
            const value = await vendorResponse.json()

            if (vendorResponse.ok) {
                const firmId = value.vendorFirmId
                const firmName = value.vendor.firm[0].firmName
                localStorage.setItem("firmName", firmName)
                localStorage.setItem("firmId", firmId)


            }
        } catch (error) {
            console.log(error)
            alert("Login Failed")
        }
    }
    return (
        <div className="loginSection">
            <form className="authForm" onSubmit={loginHandler}>
                <h2>Vendor Login</h2>
                <label htmlFor="email" >Email</label>
                <input type="text" id="email" name="email" value={email} placeholder="enter your email" onChange={e => setemail(e.target.value)} /><br />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="email" value={password} placeholder="enter your password" onChange={e => setpassword(e.target.value)} /> <br />
                <div>
                    <button type="submit" className="submitButton">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login