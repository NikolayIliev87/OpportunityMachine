import styles from './Authentication.module.css'

import { validator } from '../../services/validator';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../../services/auth_service'

export const Register = () => {
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [photourl, setPhotourl] = useState('');
    const navigate = useNavigate();

    const registerHandler = (ev) => {
        ev.preventDefault()
        const profile = {
            "first_name": firstname,
            "last_name": lastname,
            "phone": phone,
            "photo_url": photourl,
        }
        const registerData = {
          'email': username,
          "password": password,
          profile,
        }
        
        authService.register(registerData)
          .then(result => {
            // userLogin(result);
            navigate('/');
          })
          .catch(() => {navigate('/register');
        })
    };

    const usernameChangeHandler = (ev) => {
        setUsername(ev.target.value)
    };

    const passwordChangeHandler = (ev) => {
        setPassword(ev.target.value)
    };

    const firstNameChangeHandler = (ev) => {
        setFirstname(ev.target.value)
    };

    const lastNameChangeHandler = (ev) => {
        setLastname(ev.target.value)
    };

    const phoneChangeHandler = (ev) => {
        setPhone(ev.target.value)
    };

    const photoUrlChangeHandler = (ev) => {
        setPhotourl(ev.target.value)
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
        setErrors(state => ({
          ...state,
          [ev.target.id]: validated,
        }))
      }
    } 

    return (
        <section className={styles.Authentication}>
          <form onSubmit={registerHandler}>
          <h2>Register Form</h2>
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
              onBlur={validateInputs} 
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input 
              id='first_name' 
              type="text" 
              onChange={firstNameChangeHandler} 
              value={firstname}
              onBlur={validateInputs} 
            />
            {errors.first_name && <p>{errors.first_name}</p>}
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input 
              id='last_name' 
              type="text" 
              onChange={lastNameChangeHandler} 
              value={lastname}
              onBlur={validateInputs}  
            />
            {errors.last_name && <p>{errors.last_name}</p>}
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input 
              id='phone' 
              type="text" 
              onChange={phoneChangeHandler} 
              value={phone}
              onBlur={validateInputs} 
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="photo_url">Photo URL:</label>
            <input 
              id='photo_url' 
              type="text" 
              onChange={photoUrlChangeHandler} 
              value={photourl}
              onBlur={validateInputs} 
            />
            {errors.photo_url && <p>{errors.photo_url}</p>}
          </div>
          <button type="submit" >Register</button>
        </form>
      </section>
    )
}