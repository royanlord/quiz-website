import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const dataUser = JSON.parse(localStorage.getItem('userData') || 'null')

    return dataUser && dataUser.id ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute