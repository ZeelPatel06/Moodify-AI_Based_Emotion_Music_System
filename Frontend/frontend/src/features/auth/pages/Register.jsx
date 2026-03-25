import React, { useContext, useState } from 'react'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const {user, loading, handleRegister} = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        await handleRegister({email, username, password})
        navigate("/")
    }

    return (
        <div>
            <div className='form-page'>
                <div className="form-container">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <input onInput={(e) => { setEmail(e.target.value) }} value={email} type="text" name='email' placeholder='Enter Email' />
                        <input onInput={(e) => { setUsername(e.target.value) }} value={username} type="text" name='username' placeholder='Enter Username' />
                        <input onInput={(e) => { setPassword(e.target.value) }} value={password} type="password" name='password' placeholder='Enter Password' />
                        <button>Register</button>
                    </form>
                    <p>Already have account <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register