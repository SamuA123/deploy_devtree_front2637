import { useEffect, useState } from "react"
import { incrementProfileVisit } from '../api/DevTreeAPI'
import { SocialNetwork, UserHandle } from "../types"
import { EyeIcon, ChartBarIcon, FireIcon } from '@heroicons/react/24/outline'

// Ajustar el tipo para permitir _id si está disponible
interface UserHandleWithId extends UserHandle {
    _id?: string;
}

type HandleDataProps = {
    data: UserHandleWithId
}

export default function HandleData({ data }: HandleDataProps) {
    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)
    const [visitCount, setVisitCount] = useState<number | null>(null)
    const [isCounting, setIsCounting] = useState(false)
    const [showCounter, setShowCounter] = useState(false)

    useEffect(() => {
        if (data._id) {
            incrementProfileVisit(data._id).then(count => {
                setVisitCount(count ?? 0)
                setIsCounting(true)
                setShowCounter(true)
                // Resetear la animación después de un tiempo
                setTimeout(() => setIsCounting(false), 2000)
            }).catch(error => {
                console.error('Error incrementando visitas:', error)
            })
        }
    }, [data._id])

    // Función para formatear números con separadores de miles
    const formatNumber = (num: number): string => {
        return num.toLocaleString('es-ES')
    }

    // Función para obtener el mensaje según el número de visitas
    const getVisitMessage = (count: number): string => {
        if (count >= 1000) return "¡Perfil viral! 🔥"
        if (count >= 500) return "¡Muy popular! ⭐"
        if (count >= 100) return "¡En crecimiento! 📈"
        if (count >= 50) return "¡Buen comienzo! 🌱"
        return "¡Primeras visitas! 🎉"
    }

    // Función para obtener el color del mensaje
    const getMessageColor = (count: number): string => {
        if (count >= 1000) return "text-red-400"
        if (count >= 500) return "text-yellow-400"
        if (count >= 100) return "text-green-400"
        if (count >= 50) return "text-blue-400"
        return "text-purple-400"
    }

    return (
        <div className="space-y-6 text-white">
            <p className="text-5xl text-center font-black">{data.handle}</p>
            {data.image && <img src={data.image} className="max-w-[250px] mx-auto" />}

            <p className="text-lg text-center font-bold">{data.description}</p>

            <div className="mt-20 flex flex-col gap-6">
                {links.length ?
                    links.map(link => (
                        <a
                            key={link.name}
                            className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <img src={`/social/icon_${link.name}.svg`} alt="imagen red social" className="w-12" />
                            <p className="text-black capitalize font-bold text-lg">Visita mi: {link.name}</p>
                        </a>
                    ))
                    : <p className="text-center">No hay enlaces en este perfil</p>}
            </div>

            {/* Contador de visitas moderno */}
            {typeof visitCount === 'number' && showCounter && (
                <div className="mt-8 animate-count-up">
                    <div className="counter-card bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
                        {/* Header con iconos */}
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className={`p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ${isCounting ? 'animate-pulse animate-glow' : ''}`}>
                                <EyeIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                                <ChartBarIcon className="h-6 w-6 text-white" />
                            </div>
                            {visitCount >= 100 && (
                                <div className="p-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse">
                                    <FireIcon className="h-6 w-6 text-white" />
                                </div>
                            )}
                        </div>

                        {/* Contenido principal */}
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <span className="text-sm font-medium text-indigo-200 uppercase tracking-wider">
                                    Visitas Totales
                                </span>
                            </div>

                            <div className={`counter-number text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${isCounting ? 'animate-bounce' : ''}`}>
                                {formatNumber(visitCount)}
                            </div>

                            {/* Mensaje dinámico */}
                            <div className={`mt-3 text-sm font-semibold ${getMessageColor(visitCount)}`}>
                                {getVisitMessage(visitCount)}
                            </div>

                            {/* Indicador de estado */}
                            <div className="mt-3 flex items-center justify-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-indigo-200 font-medium">
                                    Perfil activo
                                </span>
                            </div>
                        </div>

                        {/* Barra de progreso decorativa */}
                        <div className="mt-4">
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out animate-progress-fill"
                                    style={{
                                        width: `${Math.min((visitCount / 1000) * 100, 100)}%`,
                                        '--progress-width': `${Math.min((visitCount / 1000) * 100, 100)}%`
                                    } as React.CSSProperties}
                                ></div>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-xs text-indigo-200">
                                    {visitCount >= 1000 ? '¡Meta alcanzada! 🎯' : `${1000 - visitCount} visitas para la meta`}
                                </span>
                            </div>
                        </div>

                        
                    </div>
                </div>
            )}
        </div>
    )
}
