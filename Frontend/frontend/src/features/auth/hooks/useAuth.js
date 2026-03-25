import { useContext, useEffect } from "react"
import { login, register, getMe, logout } from "../services/auth.api"
import { AuthContext } from "../auth.context"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleLogin({ email, password }) {
        setLoading(false)
        const data = await login({ email, password })
        setUser(data.user)
        setLoading(true)
    }
    async function handleRegister({ email, username, password }) {
        setLoading(false)
        const data = await register({ email, username, password })
        setUser(data.user)
        setLoading(true)
    }
    async function handleGetMe() {
        setLoading(false)
        const data = await getMe()
        setUser(data.user)
        setLoading(true)
    }
    async function handleLogout() {
        setLoading(false)
        const data = await logout()
        setUser(data.user)
        setLoading(true)
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    return ({ user, loading, handleLogin, handleRegister, handleGetMe, handleLogout })
}