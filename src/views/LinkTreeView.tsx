import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { updateProfile } from "../api/DevTreeAPI"
import { SocialNetwork, User } from "../types"
import { LinkIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function LinkTreeView() {
    const [devTreeLinks, setDevTreeLinks] = useState(social)

    const queryClient = useQueryClient()
    const user: User = queryClient.getQueryData(['user'])!

    const { mutate, isPending } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Actualizado Correctamente')
        }
    })

    useEffect(() => {
        const updatedData = devTreeLinks.map(item => {
            const userlink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
            if (userlink) {
                return { ...item, url: userlink.url, enabled: userlink.enabled }
            }
            return item
        })
        setDevTreeLinks(updatedData)
    }, [])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
        setDevTreeLinks(updatedLinks)
    }

    const links: SocialNetwork[] = JSON.parse(user.links)

    const handleEnableLink = (socialNetwork: string) => {
        const updatedLinks = devTreeLinks.map(link => {
            if (link.name === socialNetwork) {
                if (isValidUrl(link.url)) {
                    return { ...link, enabled: !link.enabled }
                } else {
                    toast.error('URL no Válida')
                }
            }
            return link
        })

        setDevTreeLinks(updatedLinks)

        let updatedItems: SocialNetwork[] = []
        const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)
        if (selectedSocialNetwork?.enabled) {
            const id = links.filter(link => link.id).length + 1
            if (links.some(link => link.name === socialNetwork)) {
                updatedItems = links.map(link => {
                    if (link.name === socialNetwork) {
                        return {
                            ...link,
                            enabled: true,
                            id
                        }
                    } else {
                        return link
                    }
                })
            } else {
                const newItem = {
                    ...selectedSocialNetwork,
                    id
                }
                updatedItems = [...links, newItem]
            }
        } else {
            const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
            updatedItems = links.map(link => {
                if (link.name === socialNetwork) {
                    return {
                        ...link,
                        id: 0,
                        enabled: false
                    }
                } else if (link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)) {
                    return {
                        ...link,
                        id: link.id - 1
                    }
                } else {
                    return link
                }
            })
        }

        // Almacenar en la base de datos
        queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedItems)
            }
        })
    }

    return (
        <div className="min-h-full">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 mb-8 shadow-xl">
                <div className="flex items-center justify-center space-x-3">
                    <div className="bg-white/20 p-3 rounded-full">
                        <LinkIcon className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Gestionar Enlaces</h1>
                </div>
                <p className="text-center text-blue-100 mt-2 text-lg">
                    Configura y organiza tus redes sociales
                </p>
            </div>

            {/* Contenedor principal */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Lista de enlaces */}
                <div className="p-8 space-y-6">
                    {devTreeLinks.map(item => (
                        <DevTreeInput
                            key={item.name}
                            item={item}
                            handleUrlChange={handleUrlChange}
                            handleEnableLink={handleEnableLink}
                        />
                    ))}
                </div>

                {/* Botón de guardar */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                    <button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                        onClick={() => mutate(queryClient.getQueryData(['user'])!)}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Guardando...</span>
                            </>
                        ) : (
                            <>
                                <CheckIcon className="w-5 h-5" />
                                <span>Guardar Cambios</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
