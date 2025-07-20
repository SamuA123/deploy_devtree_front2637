import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import type { RegisterForm } from '../types'
import ErrorMessage from '../components/ErrorMessage'
import api from '../config/axios'
import { UserIcon, EnvelopeIcon, LockClosedIcon, ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Logo from '../components/Logo'

export default function RegisterView() {
    const location = useLocation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    
    const initialValues: RegisterForm = {
        name: '',
        email: '',
        handle: location?.state?.handle || '',
        password: '',
        password_confirmation: ''
    }

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const password = watch('password')

    const handleRegister = async (formData: RegisterForm) => {
        setIsLoading(true)
        try {
            const { data } = await api.post(`/auth/register`, formData)
            toast.success(data)
            reset()
            navigate('/auth/login')
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-full flex flex-col justify-center">
            {/* Logo centrado */}
            <div className="flex justify-center mb-8 mt-2">
                <Logo />
            </div>
            {/* Header con gradiente */}
            <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-2xl p-8 mb-6 shadow-xl">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            <UserIcon className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Únete a DevTree</h1>
                    </div>
                    <p className="text-blue-100 text-lg">
                        Crea tu cuenta y comienza a compartir tus redes sociales
                    </p>
                </div>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="p-8 space-y-6"
                >
                    {/* Campo Nombre */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre Completo
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="name"
                                type="text"
                                placeholder="Tu nombre completo"
                                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                {...register('name', {
                                    required: "El nombre es obligatorio"
                                })}
                            />
                        </div>
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>

                    {/* Campo Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                {...register('email', {
                                    required: "El Email es obligatorio",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "E-mail no válido",
                                    },
                                })}
                            />
                        </div>
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>

                    {/* Campo Handle */}
                    <div className="space-y-2">
                        <label htmlFor="handle" className="block text-sm font-medium text-gray-700">
                            Nombre de Usuario
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-400 text-sm">@</span>
                            </div>
                            <input
                                id="handle"
                                type="text"
                                placeholder="tu-nombre-de-usuario"
                                className="block w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                {...register('handle', {
                                    required: "El Handle es obligatorio"
                                })}
                            />
                        </div>
                        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                    </div>

                    {/* Campo Password */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="Mínimo 8 caracteres"
                                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                {...register('password', {
                                    required: "El Password es obligatorio",
                                    minLength: {
                                        value: 8,
                                        message: "El password debe ser mínimo de 8 caracteres"
                                    }
                                })}
                            />
                        </div>
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>

                    {/* Campo Confirmar Password */}
                    <div className="space-y-2">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirmar Contraseña
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password_confirmation"
                                type="password"
                                placeholder="Repite tu contraseña"
                                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                {...register('password_confirmation', {
                                    required: "Repetir Password es obligatorio",
                                    validate: (value) => value === password || 'Los passwords no son iguales'
                                })}
                            />
                        </div>
                        {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                    </div>

                    {/* Botón de envío */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Creando cuenta...</span>
                                </>
                            ) : (
                                <>
                                    <CheckIcon className="w-5 h-5" />
                                    <span>Crear Cuenta</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Enlace de login */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                    <div className="text-center">
                        <p className="text-gray-600 mb-2">¿Ya tienes una cuenta?</p>
                        <Link
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                            to="/auth/login"
                        >
                            <span>Inicia sesión aquí</span>
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
