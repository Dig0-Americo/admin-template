import route from 'next/router'
import Cookies from 'js-cookie'
import firebase from '@/firebase/config'
import Usuario from '@/model/Usuario'
import { createContext, useState, useEffect } from 'react'

interface AuthContexetProps {
    usuario?: Usuario
    carregando?: boolean
    cadastrar?: (email: string, senha: string) => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContexet = createContext<AuthContexetProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

const gerenciarCookie = (logado: boolean) => {
    if (logado) {
        Cookies.set("admin-template-age", logado, {
            expires: 7
        })
    } else {
        Cookies.remove("admin-template-age")
    }
}

export const AuthProvider = (props) => {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    const configurarSessao = async (usuarioFirebase) => {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    const cadastrar = async (email, senha) => {
        try {
            setCarregando(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, senha)
            await configurarSessao(resp.user)
            route.push('/')

        } finally {
            setCarregando(false)
        }
    }

    const login = async (email, senha) => {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)
            await configurarSessao(resp.user)
            route.push('/')

        } finally {
            setCarregando(false)
        }
    }

    const loginGoogle = async () => {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            await configurarSessao(resp.user)
            route.push('/')

        } finally {
            setCarregando(false)
        }
    }

    const logout = async () => {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get("admin-template-age")) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContexet.Provider value={{
            usuario,
            carregando,
            cadastrar,
            login,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContexet.Provider>
    )
}

export default AuthContexet