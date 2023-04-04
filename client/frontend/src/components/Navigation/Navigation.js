import styles from './Navigation.module.css'

import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";

export const Navigation = () => {
    const {auth} = useContext(AuthContext)

    return (
        <nav className={styles.Navigation}>
                <ul>
                    <li><i className="fas fa-home"></i><Link to="/">Home</Link></li>
                </ul>
                {auth.id
                    ?
                    <ul>
                        {auth.is_staff || auth._is_superuser?
                        <li><i className="fas fa-users"></i><Link to="/profileslist">Profiles List</Link></li>
                        : ""
                        }
                        <li><i className="fas fa-user-circle"></i><Link to="/profile">Profile</Link></li>
                        <li><i className="fas fa-sign-out-alt"></i><Link to="/logout">Logout</Link></li>
                    </ul>

                    :
                    <ul>
                        <li><i className="fas fa-address-card"></i><Link to="/register">Register</Link></li>
                        <li><i className="fas fa-sign-in-alt"></i><Link to="/login">Login</Link></li>
                    </ul>
                }
        </nav>
    )
}