import styles from './Home.module.css'

import {Link} from 'react-router-dom'

export const HomeGuest = () => {

    return (
        <div className={styles.Home}>
            <h1>Welcome to our APP</h1>
            <h2>If you have account please <li><Link to="/login">Login</Link></li></h2>
            <h2>If not please <li><Link to="/register">Register</Link></li> to continue</h2>
        </div>
    )
}