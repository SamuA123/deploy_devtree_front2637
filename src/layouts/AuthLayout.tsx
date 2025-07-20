import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function AuthLayout() {
    return (
        <>
            <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                {/* Contenido principal */}
                <div className='relative z-10 max-w-md mx-auto pt-8 px-6 pb-8'>
                    <div className='py-4'>
                        <Outlet />
                    </div>
                </div>
            </div>

            <Toaster position='top-right' />
        </>
    )
}
