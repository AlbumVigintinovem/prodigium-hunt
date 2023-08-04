import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/login.css';
import { ref, set, onValue, remove, update, query, orderByChild, equalTo } from "firebase/database";
import bcrypt from 'bcryptjs'
import { database } from '../firebase';


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [i_passwordLogin, setI_passwordLogin] = useState();
    const [i_usernameLogin, setI_usernameLogin] = useState();


    const loginHandler = async (e) => {
        e.preventDefault();
        const filteredUser = query(ref(database, "users"), orderByChild("username"), equalTo(i_usernameLogin));
        onValue(filteredUser, (snapshot) => {
            let data_ = snapshot.val();
            let _data_ = Object.keys(data_).map(key => {
                return data_[key];
            })
            console.log(_data_);
            const userName = i_usernameLogin;
            const password = i_passwordLogin;
            if (!_data_) {
                console.log("Kullanıcı Bulunamadı.");
                setI_usernameLogin("");
                setI_passwordLogin("");
            } else {
                const savedHash = _data_[0].pass;
                bcrypt.compare(password, savedHash, function (err, result) {
                    if (result === true) {
                        console.log("tebrikler" + localStorage.getItem("userId")) // doğru şifre
                        setI_usernameLogin("");
                        setI_passwordLogin("");
                        navigate("/");
                        localStorage.setItem("userId", _data_[0].id);
                    } else {
                        console.log("giremen guzum giremen") // yanlış şifre
                        setI_usernameLogin("");
                        setI_passwordLogin("");
                    }
                });
            }
        });
    }

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


    return (
        <>
            <div className="container-fluid">
                <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div className="rounded p-4 p-sm-5 my-4 mx-3">
                            <div className='col-md-12 d-flex align-items-center justify-content-center' >
                                <h2>Prodigium Hunt</h2>
                            </div>
                            <div className='col-md-12'>
                                <div className="inputContainer">
                                    <div className="inputBox">
                                        <input type="text" required value={i_usernameLogin} onChange={(e) => setI_usernameLogin(e.target.value)} />
                                        <span>Username</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className="inputContainer">
                                    <div className="inputBox">
                                        <input type="password" required id="password" value={i_passwordLogin} onChange={(e) => setI_passwordLogin(e.target.value)} />
                                        <span>Password</span>
                                        <div id="toggle" onClick={showHide} ></div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center align-items-center m-3' >
                                <p> You dont remember password? <Link to='/signup'>Click here.</Link></p>
                            </div>
                            <div className='d-flex justify-content-center' >
                                <button className="btn btn-primary py-3 w-50" onClick={loginHandler} >Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Login