import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import db from '../firebase'
import bcrypt from 'bcryptjs'
import { ref, set, onValue, remove, update, query, orderByChild, equalTo } from "firebase/database";
import { database } from '../firebase';
import { nanoid, random } from 'nanoid';

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [i_passwordSingup, setI_passwordSingup] = useState();
    const [i_usernameSingup, setI_usernameSingup] = useState();

    const navigate = useNavigate();

    const saltRounds = 10;



    let password_ = document.getElementById('password');
    let togglePassword = document.getElementById('toggle');

    const showHide = () => {
        if (password_.type === "password") {
            password_.setAttribute('type', 'text');
            togglePassword.classList.add('hide');
        } else {
            password_.setAttribute('type', 'password');
            togglePassword.classList.remove('hide');

        }
    }

    const singupHandler = () => {
        const password = i_passwordSingup;
        console.log(password)
        bcrypt.hash(password, saltRounds, function (err, hash) {
            const createId = nanoid();
            console.log(hash)
            set(ref(database, 'users/' + createId), { username: i_usernameSingup, pass: hash, id: createId, });
        });
        console.log("User has been created!");
        resetForm();
    }
    const resetForm = () => {
        setI_passwordSingup("");
        setI_usernameSingup("");
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="rounded p-4 p-sm-5 my-4 mx-3">
                            <div className='col-md-12 d-flex align-items-center justify-content-center' >
                                <h2>Singup Prodigium Hunt</h2>
                            </div>
                            <div className='col-md-12'>
                                <div className="inputContainer">
                                    <div className="inputBox">
                                        <input type="text" required value={i_usernameSingup} onChange={(e) => setI_usernameSingup(e.target.value)} />
                                        <span>Username</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className="inputContainer">
                                    <div className="inputBox">
                                        <input type="password" required id="password" value={i_passwordSingup} onChange={(e) => setI_passwordSingup(e.target.value)} />
                                        <span>Password</span>
                                        <div id="toggle" onClick={showHide} ></div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center' >
                                <button className="btn btn-primary py-3 w-50 mt-5" onClick={singupHandler} >Sing Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default SignUp