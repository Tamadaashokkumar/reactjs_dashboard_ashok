import React, { useState } from 'react'
import { url } from '../../api'
const Register = ({ showLoginHandiler }) => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")


    const vendorRegister = async (e) => {
        e.preventDefault()
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        }
        try {
            const response = await fetch(`${url}/vendor/register`, options)
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                alert("vendor register success")
                console.log("register successfull")
                setusername("")
                setpassword("")
                setemail("")
                showLoginHandiler()
            }

        } catch (error) {
            console.log("registration failed", error)
            alert('Vedor Registration Failed')

        }
    }



    return (
        <div className="registerSection">
            <form className="authForm" onSubmit={vendorRegister}>
                <h3>Vendor Register</h3>
                <label htmlFor="">Username</label>
                <input type="text" name="username" value={username} placeholder="Enter your username" onChange={e => setusername(e.target.value)} /><br />
                <label htmlFor="">Email</label>
                <input type="text" name="email" value={email} placeholder="Enter your email" onChange={(e) => setemail(e.target.value)} /><br />
                <label htmlFor="">Password</label>
                <input type="text" name="password" value={password} placeholder="Enter your password" onChange={e => setpassword(e.target.value)} /> <br />
                <div>
                    <button type="submit" className="submitButton">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register