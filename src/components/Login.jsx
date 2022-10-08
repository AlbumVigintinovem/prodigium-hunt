import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {createUser, signIn} = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
            e.preventDefault()
            setError('')
            try {
                await createUser(email, password);
                navigate('/')
            } catch (e) {
                setError(e.message)
                toast.error(error)
            }
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        navigate('/')
        setError('')
        try {
            await signIn(email,password)
        } catch (e) {
            setError(e.message)
            toast.error(error)
        }
    }

 
    return (
        <> 
           <h2> Log In </h2>
            <div>
                <label>E-mail</label>
                <input type='email' onChange={(e) => setEmail(e.target.value)} />
                <label>Pass</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSignIn}>Login</button>
            </div>
            <div>
                You dont any account? <Link to='/signup' >Sign Up</Link>  here.
            </div>
        </>
    )
}

export default Login