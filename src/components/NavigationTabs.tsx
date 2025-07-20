import { BookmarkSquareIcon, UserIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
    { name: 'Links', href: '/admin', icon: BookmarkSquareIcon },
    { name: 'Mi Perfil', href: '/admin/profile', icon: UserIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationTabs() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(e.target.value)
    }

    return (
        <div className='mb-8'>
            {/* Versión móvil */}
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Seleccionar pestaña
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-xl border-gray-200 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 font-medium"
                    onChange={handleChange}
                >
                    {tabs.map((tab) => (
                        <option
                            value={tab.href}
                            key={tab.name}
                        >{tab.name}</option>
                    ))}
                </select>
            </div>

            {/* Versión desktop */}
            <div className="hidden sm:block">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
                    <nav className="flex space-x-2" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const isActive = location.pathname === tab.href
                            return (
                                <Link
                                    key={tab.name}
                                    to={tab.href}
                                    className={classNames(
                                        isActive
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                        'group flex items-center px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200 relative overflow-hidden'
                                    )}
                                >
                                    {/* Efecto de brillo para la pestaña activa */}
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                    )}
                                    
                                    <tab.icon
                                        className={classNames(
                                            isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700',
                                            'mr-3 h-6 w-6 transition-colors duration-200'
                                        )}
                                        aria-hidden="true"
                                    />
                                    <span className="relative z-10">{tab.name}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}