import { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState()

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            localStorage.setItem("userIds", JSON.stringify(currentUser))
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    

    const data = {
        createUser,
        user,
        logout,
        signIn,
    }

    return (
        <UserContext.Provider value={data} >
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () =>
    useContext(UserContext)
