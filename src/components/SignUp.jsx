import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import db from '../firebase'

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { createUser, signIn } = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await createUser(email, password);
            navigate('/')
            db.collection("player/").doc(JSON.parse(localStorage.getItem("userIds"))?.uid).collection("0").add({
                uid: 1,
                job: "mage",
                charLevel: 1,
                charDamageMin: 0.5,
                charDamageMax: 7,
                charLevelExp: 0,
                charLevelUpExp: 10,
                charBagItem: [],
                charHP: 70,
                charCurrentHP: 70,
                charName: "denememagic1",
                currentGold: 0,
            })
        } catch (e) {
            setError(e.message)
            toast.error(error);
        }
    }

    return (
        <>
            <h2> Sign Up </h2>
            <div>
                <label>E-mail</label>
                <input type='email' onChange={(e) => setEmail(e.target.value)} />
                <label>Pass</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSubmit}>Sign Up</button>
            </div>

        </>
    )
}

export default SignUp