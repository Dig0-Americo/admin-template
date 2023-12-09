import useAuthData from '@/data/hook/useAtuthData'
import { IconeLogout, IconeNotificacoes, iconeHome, iconeSettings } from '../icons'
import Logo from './Logo'
import MenuItem from './MenuItem'

export default function MenuLateral() {
    const { logout } = useAuthData() 
    return (
        <aside className={`
                flex flex-col
                bg-gray-200 text-gray-700
                dark:bg-gray-900
        `}>
            <div className={`
                h-20 w-20
            `}>
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItem url='/' texto='Inicio' icone={iconeHome} />
                <MenuItem url='/ajustes' texto='Ajustes' icone={iconeSettings} />
                <MenuItem url='/notificacoes' texto='Notificações' icone={IconeNotificacoes} />
            </ul>
            <ul>
                <MenuItem texto='Sair' icone={IconeLogout}
                    onClick={logout}
                    clasName={`
                        text-red-600 dark:text-red-500
                        hover:bg-red-400 hover:text-white dark:hover:text-white
                    `} />
            </ul>
        </aside>
    )
}