import { Link, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import NavigationTabs from "./NavigationTabs"
import { SocialNetwork, User } from '../types'
import { useEffect, useState } from 'react'
import DevTreeLink from './DevTreeLink'
import { useQueryClient } from '@tanstack/react-query'
import Header from './Header'
import { EyeIcon, LinkIcon } from '@heroicons/react/24/outline'

// Definir el tipo de props para el componente DevTree
type DevTreeProps = {
    data: User
}

// Componente de árbol de desarrollo
export default function DevTree({ data }: DevTreeProps) {
    // Estado para los enlaces habilitados
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))

    // Actualizar los enlaces habilitados cuando los datos cambian
    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])

    // Inicializar el queryClient
    const queryClient = useQueryClient()

    // Manejar el final del arrastre
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e

        // Si hay un elemento sobre el que se está arrastrando
        if (over && over.id) {
            // Obtener el índice del elemento anterior
            const prevIndex = enabledLinks.findIndex(link => link.id === active.id)
            // Obtener el índice del elemento sobre el que se está arrastrando
            const newIndex = enabledLinks.findIndex(link => link.id === over.id)
            const order = arrayMove(enabledLinks, prevIndex, newIndex)
            setEnabledLinks(order)

            const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)
            const links = order.concat(disabledLinks)
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    links: JSON.stringify(links)
                }
            })

        }
    }


    return (
        <>
            <Header />

            {/* Contenedor principal */}
            <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 min-h-screen py-8">
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <NavigationTabs />

                    {/* Enlace para visitar el perfil */}
                    <div className="flex justify-end mb-8">
                        <Link
                            className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-gray-700 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <EyeIcon className="h-5 w-5" />
                            <span className="font-semibold">Visitar Mi Perfil: /{data.handle}</span>
                        </Link>
                    </div>

                    {/* Contenedor principal */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Panel de contenido principal */}
                        <div className="flex-1">
                            <Outlet />
                        </div>

                        {/* Panel de vista previa */}
                        <div className="w-full lg:w-96">
                            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
                                {/* Header del perfil */}
                                <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-6 border-b border-slate-700">
                                    <div className="text-center">
                                        <h2 className="text-3xl font-bold text-white mb-2">{data.handle}</h2>
                                        <div className="flex items-center justify-center space-x-2 text-indigo-300">
                                            <LinkIcon className="h-4 w-4" />
                                            <span className="text-sm font-medium">Tu perfil público</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contenido del perfil */}
                                <div className="p-6 space-y-6">
                                    {/* Imagen de perfil */}
                                    {data.image ? (
                                        <div className="flex justify-center">
                                            <img 
                                                src={data.image} 
                                                alt='Imagen Perfil' 
                                                className='w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-xl'
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center border-4 border-white/20 shadow-xl">
                                                <span className="text-4xl font-bold text-white">{data.handle.charAt(0).toUpperCase()}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Descripción */}
                                    <div className="text-center">
                                        <p className='text-lg font-medium text-slate-200 leading-relaxed'>{data.description}</p>
                                    </div>

                                    {/* Separador */}
                                    <div className="border-t border-slate-700 pt-6">
                                        <h3 className="text-center text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">
                                            Enlaces Sociales
                                        </h3>
                                    </div>

                                    {/* Arrastre de enlaces */}
                                    <DndContext
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                    >
                                        {/* Lista de enlaces */}
                                        <div className='space-y-3'>
                                            <SortableContext
                                                items={enabledLinks}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {/* Enlace */}
                                                {enabledLinks.map(link => (
                                                    <DevTreeLink key={link.name} link={link} />
                                                ))}
                                            </SortableContext>
                                        </div>
                                    </DndContext>

                                    {/* Mensaje si no hay enlaces */}
                                    {enabledLinks.length === 0 && (
                                        <div className="text-center py-8">
                                            <div className="bg-slate-700/50 rounded-lg p-4">
                                                <p className="text-slate-400 text-sm">
                                                    No hay enlaces habilitados
                                                </p>
                                                <p className="text-slate-500 text-xs mt-1">
                                                    Agrega enlaces en la pestaña "Links"
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}
