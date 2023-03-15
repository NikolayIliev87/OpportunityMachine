import styles from './Home.module.css'

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// import { TicketsContext } from "../../contexts/TicketsContext";



export const HomeUser = () => {
    const {auth} = useContext(AuthContext)
    // const {tickets} = useContext(TicketsContext)
    // const incomplete = tickets.filter(x => x['status'] === false)

    return (
        <div className={styles.Home}>
            <h1>Welcome {auth.email} to our App!</h1>
            {/* <h2>You have {tickets.length} tickets issued out of which {incomplete.length} still not closed</h2> */}
        </div>
    )
}