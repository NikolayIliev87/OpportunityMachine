import styles from './Authentication.module.css'

import {Link} from 'react-router-dom'

import { validator } from '../../services/validator';

import { useState, useContext } from "react";
import * as authService from '../../services/auth_service'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";


export const Login = () => {
    const [errors, setErrors] = useState({});
    const {userLogin} = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginHandler = (ev) => {
        ev.preventDefault()

        const logInData = {
          'username': username,
          "password": password,
        }
        
        authService.login(logInData)
          .then(result => {
            userLogin(result);
            navigate('/');
          })
          .catch(() => {navigate('/login');
          })
    };

    const usernameChangeHandler = (ev) => {
        setUsername(ev.target.value)
    };

    const passwordChangeHandler = (ev) => {
        setPassword(ev.target.value)
    };

    const validateInputs = (ev) => {
      let validated = validator(ev)
      if (validated) {
        setErrors(state => ({
          ...state,
          [ev.target.id]: validated,
        }))
      }
      else {
        setErrors({})
      }
      // else {
      //   setErrors(state => ({
      //     ...state,
      //     [ev.target.id]: validated,
      //   }))
      // }
    } 

    return (
        <section className={styles.Authentication}>
          <form onSubmit={loginHandler}>
          <h2>LogIn Form</h2>
          <div>
            <label htmlFor="username" >Email:</label>
            <input 
              id='username' 
              type="text" 
              onChange={usernameChangeHandler} 
              value={username}
              onBlur={validateInputs}  
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input 
              id='password' 
              type="password" 
              onChange={passwordChangeHandler} 
              value={password}
            />
          </div>
          <button 
            type="submit"
            hidden={Object.keys(errors).length > 0 || username === '' || password === ''?true:false} 
          >Login</button>
        </form>
        <p>If you don't have account yet, please <Link to="/register">Register</Link></p>
      </section>
    )
}