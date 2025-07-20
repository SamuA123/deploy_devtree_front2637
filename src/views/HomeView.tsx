import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import { Link } from 'react-router-dom';
import { UserGroupIcon, LinkIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function HomeView() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden py-10">
        {/* Hero principal */}
        <section className="w-full max-w-3xl mx-auto flex flex-col items-center text-center mt-10 mb-16">
          <img src="/devtree2.png" alt="DevTree Logo" className="w-auto h-20 mb-4 drop-shadow-xl" />
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Conecta todas tus redes <br /> en un solo enlace
          </h1>
          <p className="text-indigo-100 text-lg mb-6 max-w-xl mx-auto">
            DevTree te permite compartir todos tus perfiles y enlaces importantes en una sola página personalizable. ¡Ideal para creadores, freelancers y profesionales digitales!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link to="/auth/login" className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">Iniciar Sesión</Link>
            <Link to="/auth/register" className="px-8 py-3 rounded-xl font-bold bg-white/10 border border-indigo-400 text-indigo-100 shadow-lg hover:bg-white/20 hover:text-white transition-all duration-200">Registrarme</Link>
          </div>
        </section>

        {/* Tarjeta de búsqueda flotante */}
        <section className="relative z-10 w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 px-8 py-8 flex flex-col items-center mb-16">
          <h2 className="text-xl font-bold text-indigo-200 mb-2">Busca un perfil DevTree</h2>
          <SearchForm />
        </section>

        {/* ¿Qué es DevTree? */}
        <section className="w-full max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3 bg-slate-800/60 rounded-xl p-6 border border-slate-700 shadow">
            <UserGroupIcon className="h-10 w-10 text-indigo-400 mb-2" />
            <h3 className="text-lg font-bold text-white mb-1">Para todos</h3>
            <p className="text-indigo-100 text-sm">Ideal para creadores, influencers, estudiantes y profesionales.</p>
          </div>
          <div className="flex flex-col items-center gap-3 bg-slate-800/60 rounded-xl p-6 border border-slate-700 shadow">
            <LinkIcon className="h-10 w-10 text-pink-400 mb-2" />
            <h3 className="text-lg font-bold text-white mb-1">Todos tus enlaces</h3>
            <p className="text-indigo-100 text-sm">Agrupa tus redes sociales, portafolio, tienda y más en un solo lugar.</p>
          </div>
          <div className="flex flex-col items-center gap-3 bg-slate-800/60 rounded-xl p-6 border border-slate-700 shadow">
            <DevicePhoneMobileIcon className="h-10 w-10 text-green-400 mb-2" />
            <h3 className="text-lg font-bold text-white mb-1">Accesible y móvil</h3>
            <p className="text-indigo-100 text-sm">Tu DevTree se ve increíble en cualquier dispositivo y es fácil de compartir.</p>
          </div>
        </section>
      </main>
    </>
  )
}
