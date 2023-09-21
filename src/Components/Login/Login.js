import React, { useState } from 'react';
import './Styles/Login.css';
import Gallery from "../Gallery/Gallery";
import {database} from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [login, setLogin] = useState(false)

    const history = useNavigate()

    const handleSubmit =(e,type)=>{
        e.preventDefault()
       const email = e.target.email.value
       const password = e.target.password.value
       if(type == 'signup'){

       createUserWithEmailAndPassword(database, email, password).then(data=>{
        console.log(data, "authData")
        history('/Home')
       }).catch(err=>{
        alert(err.code)
        setLogin(true)
       })
    }else{
        signInWithEmailAndPassword(database, email, password).then(data=>{
            console.log(data, "authData")
            history('/Home')
           }).catch(err=>{
            alert(err.code)
           })
    }
    }

  return (
    <div>
    <div className='LoginForm'>
    <div className='innerForm'>
    <div className='row'>
        <div id='signup' className={login == false ? 'activeColor':'pointer'} onClick={() =>setLogin(false)}>Sign Up</div>
        <div id='signin' className={login == true ? 'activeColor':'pointer'} onClick={() =>setLogin(true)}>Sign in</div>
    </div>
    <h2 className="account">{login?'Sign In':'Sign Up'}</h2>
           <form onSubmit={(e) => handleSubmit(e,login?'signin':'signup')}>
             <label>Email</label>
             <input name='email' type="email" ></input>

             <label>Password</label>
             <input name='password'  type="password" />

             <label className="checkbox">
               <input className="checkboxInput" type="checkbox" />
               Remember me
            </label>

             <button >{login?'Sign In':'Sign Up'}</button>
           </form>
        </div>
    </div>
    </div>
  )
}

export default Login;
