import Image from 'next/image'
import loading from '../../../public/imagens/loading.gif'
import useAuthData from '@/data/hook/useAtuthData'
import router from 'next/router'
import Head from 'next/head'

export default function ForcarAutenticacao(props) {

    const { usuario, carregando } = useAuthData()

    const redenrizarConteudo = () => {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            if(!document.cookie.includes('admin-template-age')) 
                            {
                                window.location.href='/autenticacao' 
                            }
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    const redenrizarCarregando = () => {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={loading} alt='Gif de carregando' />
            </div>
        )
    }
    if (!carregando && usuario?.email) {
        return redenrizarConteudo()
    } else if (carregando) {
        return redenrizarCarregando()
    } else {
        router.push('/autenticacao')
        return null
    }

}