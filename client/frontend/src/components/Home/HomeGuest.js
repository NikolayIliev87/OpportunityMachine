import styles from './Home.module.css'

import {Link} from 'react-router-dom'

export const HomeGuest = () => {

    return (
        <div className={styles.HomeGuest}>
            <div>
                <h1>Welcome to Our APP</h1>
                <h2>LOGO</h2>
                <h2>Company Name</h2>
            </div>
            <div>
                <Link to="/login">
                    <h3>If you have account please</h3>
                    <h4>Login</h4>
                </Link>
                <Link to="/register">
                    <h3>If you not please</h3>
                    <h4>Register</h4>
                </Link>
            </div>
        </div>
    )
}