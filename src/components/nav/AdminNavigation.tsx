import { useQueryClient } from '@tanstack/react-query'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export default function AdminNavigation() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    // Cerrar sesión
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        queryClient.clear(); // Limpia todo el cache de React Query
        navigate('/auth/login'); // Redirección inmediata
    }
    return (
        // Botón para cerrar sesión
        <button
            className="flex items-center gap-2 px-5 py-2 rounded-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md hover:scale-105 hover:from-pink-700 hover:to-purple-700 transition-all duration-200 border border-pink-400 uppercase text-xs tracking-wide focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
            onClick={logout}
        >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Cerrar Sesión
        </button>
    )
}
