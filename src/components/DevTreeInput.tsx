import { Switch } from '@headlessui/react'
import { DevTreeLink } from "../types"
import { classNames } from '../utils'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

type DevTreeInputProps = {
    item: DevTreeLink
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEnableLink: (socialNetwork: string) => void
}

export default function DevTreeInput({ item, handleUrlChange, handleEnableLink }: DevTreeInputProps) {

    return (
        <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group">
            <div className="flex items-center gap-4">
                {/* Icono de la red social */}
                <div className="flex-shrink-0">
                    <div
                        className="w-14 h-14 bg-cover bg-center rounded-xl shadow-sm border border-gray-200"
                        style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
                    ></div>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 space-y-2">
                    {/* Nombre de la red social */}
                    <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-800 capitalize">{item.name}</h3>
                        <div className={classNames(
                            item.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600',
                            'px-2 py-1 rounded-full text-xs font-medium'
                        )}>
                            {item.enabled ? 'Activo' : 'Inactivo'}
                        </div>
                    </div>

                    {/* Campo de URL */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:bg-gray-50 focus:bg-white"
                            value={item.url}
                            onChange={handleUrlChange}
                            name={item.name}
                            placeholder={`https://${item.name}.com/tu-usuario`}
                        />
                    </div>
                </div>

                {/* Switch de activación */}
                <div className="flex-shrink-0">
                    <Switch
                        checked={item.enabled}
                        name={item.name}
                        onChange={() => handleEnableLink(item.name)}
                        className={classNames(
                            item.enabled ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200',
                            'relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md'
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                item.enabled ? 'translate-x-7' : 'translate-x-0',
                                'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out'
                            )}
                        />
                    </Switch>
                </div>
            </div>

            {/* Indicador de estado */}
            {item.enabled && item.url && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Enlace configurado y activo</span>
                    </div>
                </div>
            )}
        </div>
    )
}
