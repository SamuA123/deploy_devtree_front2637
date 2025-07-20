import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SocialNetwork } from "../types"
import { Bars3Icon } from '@heroicons/react/24/outline'

type DevTreeLinkProps = {
    link: SocialNetwork
}

export default function DevTreeLink({ link }: DevTreeLinkProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: link.id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <li
            ref={setNodeRef}
            style={style}
            className="group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 px-4 py-3 flex items-center gap-4 rounded-xl border border-slate-600 hover:border-slate-500 transition-all duration-200 cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl"
            {...attributes}
            {...listeners}
        >
            {/* Icono de arrastre */}
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Bars3Icon className="h-4 w-4 text-slate-400" />
            </div>

            {/* Icono de la red social */}
            <div className="flex-shrink-0">
                <div
                    className="w-10 h-10 bg-cover bg-center rounded-lg shadow-sm"
                    style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
                ></div>
            </div>

            {/* Texto del enlace */}
            <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-sm font-medium truncate">
                    Visita mi: <span className="font-bold text-white capitalize">{link.name}</span>
                </p>
            </div>

            {/* Indicador de estado */}
            <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
        </li>
    )
}
