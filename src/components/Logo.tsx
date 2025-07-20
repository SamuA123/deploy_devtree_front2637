import { Link } from 'react-router-dom'

export default function Logo() {
    return (
        <Link to={'/'}>
            <img src="/devtree2.png" className="h-20 w-auto block" alt='Logotipo Devtree' />
        </Link>
    )
}
