import { useState } from 'react'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, user, handleLogin } = useAuth();
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({email, password})
        navigate("/")
    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
            <div className='form-page'>
                <div className="form-container">
                    <h2>Login </h2>
                    <form onSubmit={handleSubmit}>
                        <input onInput={(e) => { setEmail(e.target.value) }} value={email} type="text" name='email' placeholder='Enter Email' />
                        <input onInput={(e) => { setPassword(e.target.value) }} value={password} type="password" name='password' placeholder='Enter Password' />
                        <button>Login</button>
                    </form>
                    <p>Don't have account <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login