import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import ErrorMessage from '../components/ErrorMessage'
import { ProfileForm, User } from '../types'
import { updateProfile, uploadImage } from '../api/DevTreeAPI'
import { UserIcon, PhotoIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function ProfileView() {
    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        defaultValues: {
            handle: data.handle,
            description: data.description
        }
    })

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    image: data
                }
            })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            uploadImageMutation.mutate(e.target.files[0])
        }
    }

    const handleUserProfileForm = (formData: ProfileForm) => {
        const user: User = queryClient.getQueryData(['user'])!
        user.description = formData.description
        user.handle = formData.handle
        updateProfileMutation.mutate(user)
    }

    return (
        <div className="min-h-full">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-8 mb-8 shadow-xl">
                <div className="flex items-center justify-center space-x-3">
                    <div className="bg-white/20 p-3 rounded-full">
                        <UserIcon className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Editar Perfil</h1>
                </div>
                <p className="text-center text-indigo-100 mt-2 text-lg">
                    Personaliza tu información y apariencia
                </p>
            </div>

            {/* Formulario principal */}
            <form
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                onSubmit={handleSubmit(handleUserProfileForm)}
            >
                {/* Sección de imagen de perfil */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-100">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <PhotoIcon className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Imagen de Perfil</h2>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        {/* Preview de imagen actual */}
                        <div className="flex-shrink-0">
                            {data.image ? (
                                <img 
                                    src={data.image} 
                                    alt="Imagen actual" 
                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-4 border-white shadow-lg">
                                    <UserIcon className="h-8 w-8 text-gray-400" />
                                </div>
                            )}
                        </div>
                        
                        {/* Input de archivo */}
                        <div className="flex-1">
                            <label 
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Cambiar imagen
                            </label>
                            <input
                                id="image"
                                type="file"
                                name="image"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer cursor-pointer"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Formatos: JPG, PNG, GIF. Máximo 5MB
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sección de información personal */}
                <div className="p-8 space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <PencilIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
                    </div>

                    {/* Campo Handle */}
                    <div className="space-y-2">
                        <label
                            htmlFor="handle"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nombre de Usuario
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-400 text-sm">@</span>
                            </div>
                            <input
                                type="text"
                                id="handle"
                                className="block w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
                                placeholder="tu-nombre-de-usuario"
                                {...register('handle', {
                                    required: "El Nombre de Usuario es obligatorio"
                                })}
                            />
                        </div>
                        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                    </div>

                    {/* Campo Descripción */}
                    <div className="space-y-2">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white resize-none"
                            placeholder="Cuéntanos sobre ti, tu trabajo, pasiones..."
                            {...register('description', {
                                required: "La Descripción es obligatoria"
                            })}
                        />
                        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                    </div>
                </div>

                {/* Botón de guardar */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                        {updateProfileMutation.isPending ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Guardando...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Guardar Cambios</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}