import Link from "next/link"

interface MenuItemProps {
    url?: string
    texto: string
    icone: any
    onClick?: (evento: any) => void
    clasName?: string
}

export default function MenuItem(props: MenuItemProps) {
    const redenrizarLink = () => {
        return (
            <div className={`
            flex flex-col justify-center items-center
            h-20 w-20  text-gray-600 ${props.clasName}
            dark:text-gray-400
        `}>
                {props.icone}
                <span className={`
                text-xs font-light
                `}>
                    {props.texto}
                </span>
            </div>
        )
    }
    return (
        <li onClick={props.onClick}
            className={`
            hover:bg-gray-300 
            dark:hover:bg-gray-700
            cursor-pointer 
            `}>
            {props.url ? (
                <Link href={props.url}>
                    {redenrizarLink()}
                </Link>
            ) : (
                redenrizarLink()
            )}
        </li>
    )
}