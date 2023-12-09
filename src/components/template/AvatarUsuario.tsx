import useAuthData from "@/data/hook/useAtuthData";
import Image from "next/image";
import Link from "next/link";

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const { usuario } = useAuthData()
    return (
        <Link href='/perfil'>
            <Image src={usuario?.imagemUrl ?? '/imagens/avatar.png'}
                alt="Foto de Perfil"
                className="ml-3 rounded-full cursor-pointer"
                width={40}
                height={40}
            >
            </Image>
                {props.className}
        </Link>
    )
}