import { useUser } from '../context/useUser'
import { Outlet,Navigate } from 'react-router-dom'

export default function ProtectedRoute() {
    const { user } = useUser()
    
    if (!user || !user.token) return <Navigate to ="/?login=1" replace />
        return (<Outlet />)
}
