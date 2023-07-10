import styles from './Navigation.module.css'

import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";

export const Navigation = () => {
    const {auth} = useContext(AuthContext)

    return (
        <nav className={styles.Navigation}>
                <ul>
                    <li><Link to="/">LOGO/HOME</Link></li>
                </ul>
                {auth.id
                    ?
                    <ul>
                        {/* {auth.is_staff || auth._is_superuser?
                        <li><i className="fas fa-users"></i><Link to="/profileslist">Profiles List</Link></li>
                        : ""
                        } */}
                        {/* <li><i className="fas fa-user-circle"></i><Link to="/profile">Profile</Link></li> */}
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>

                    :
                    <ul>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                }
                <div className={styles.Settings}>
                    {auth.id
                    ?
                    <>
                    <Link to="/profile"><i class="fas fa-user-circle"></i></Link>
                    <Link to="#"><i class="far fa-bell"></i></Link>
                    </>
                    :
                    <></>
                    }
                    <Link to="#"><i class="fas fa-cog"></i></Link>
                </div>
        </nav>
    )
}