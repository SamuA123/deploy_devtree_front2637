import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import ErrorMessage from '../components/ErrorMessage'
import { LoginForm } from '../types'
import api from '../config/axios'
import { EnvelopeIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Logo from '../components/Logo'

export default function LoginView() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient();
    
    const initialValues: LoginForm = {
        email: '',
        password: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleLogin = async (formData: LoginForm) => {
        setIsLoading(true)
        try {
            const { data } = await api.post(`/auth/login`, formData)
            localStorage.setItem('AUTH_TOKEN', data)
            await queryClient.invalidateQueries({ queryKey: ['user'] })
            navigate('/admin')
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
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-8 mb-6 shadow-xl">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            <LockClosedIcon className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Bienvenido de Vuelta</h1>
                    </div>
                    <p className="text-indigo-100 text-lg">
                        Inicia sesión para acceder a tu panel de control
                    </p>
                </div>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="p-8 space-y-6"
                    noValidate
                >
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
                                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                {...register("email", {
                                    required: "El Email es obligatorio",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "E-mail no válido",
                                    },
                                })}
                            />
                        </div>
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
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
                                placeholder="Tu contraseña"
                                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                {...register("password", {
                                    required: "El Password es obligatorio",
                                })}
                            />
                        </div>
                        {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                        )}
                    </div>

                    {/* Botón de envío */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Iniciando sesión...</span>
                                </>
                            ) : (
                                <>
                                    <span>Iniciar Sesión</span>
                                    <ArrowRightIcon className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Enlace de registro */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                    <div className="text-center">
                        <p className="text-gray-600 mb-2">¿No tienes una cuenta?</p>
                        <Link
                            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200"
                            to="/auth/register"
                        >
                            <span>Crea una cuenta aquí</span>
                            <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
