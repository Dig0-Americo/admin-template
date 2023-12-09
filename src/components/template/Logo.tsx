import Image from 'next/image'

export default function Logo() {
    return (
        <Image className='rounded-full'
            src="/imagens/Logo4.png"
            width={400}
            height={400}
            alt="Logotipo da empresa."
        />
    )
}
