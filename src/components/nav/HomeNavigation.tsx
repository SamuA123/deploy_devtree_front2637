import { Link } from 'react-router-dom'

// Componente de navegación para la página de inicio
export default function HomeNavigation() {
  // Renderizar los enlaces de inicio de sesión y registro
  return (
    <div className="flex gap-3">
      {/* Enlace para iniciar sesión */}
      <Link
        className="px-5 py-2 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:scale-105 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 border border-indigo-400 uppercase text-xs tracking-wide"
        to='/auth/login'
      >
        Iniciar Sesión
      </Link>

      {/* Enlace para registrarme */}
      <Link
        className="px-5 py-2 rounded-xl font-bold bg-white/10 border border-indigo-400 text-indigo-100 shadow-md hover:bg-white/20 hover:text-white transition-all duration-200 uppercase text-xs tracking-wide"
        to='/auth/register'
      >
        Registrarme
      </Link>
    </div>
  )
}
