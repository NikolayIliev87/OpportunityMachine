import styles from './Authentication.module.css'

import { useNavigate } from 'react-router-dom'

import * as authService from '../../services/auth_service'

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Logout = (props) => {
    const {userLogin} = useContext(AuthContext)
    const navigate = useNavigate();

    const logoutHandler = (ev) => {
        ev.preventDefault()

        authService.logout()
          .then(result => {
            userLogin({});
            navigate('/');
          })
          .catch(() => {navigate('/');
        })
    }

    return (
      <section className={styles.Logout}>
          <form onSubmit={logoutHandler}>
            <h3>Are you sure you want to </h3><button type="submit" >Logout</button>
        </form>
      </section>
    )
}