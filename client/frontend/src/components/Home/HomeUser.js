import styles from './Home.module.css'

import {Link, Outlet, useOutlet} from 'react-router-dom'

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// import { TicketsContext } from "../../contexts/TicketsContext";



export const HomeUser = () => {
    const {auth} = useContext(AuthContext)
    const outlet = useOutlet()
    const aaa = <h1 className={styles.HomeUserTitle}>{auth.email} workspace. Placeholder for main home page</h1>
    // const {tickets} = useContext(TicketsContext)
    // const incomplete = tickets.filter(x => x['status'] === false)

    return (
        <div className={styles.HomeUser}>
            {/* <h1 className={styles.HomeUserTitle}>{auth.email} workspace</h1> */}
            {/* <h2>You have {tickets.length} tickets issued out of which {incomplete.length} still not closed</h2> */}
            <div className={styles.HomeUserOptions}>
                <ul>
                    <li><Link to="/opportunitylist">Opportunities</Link></li>
                    <li><Link to="/clientlist">Clients</Link></li>
                    <li><Link to="/productlist">Products</Link></li>
                    {auth.is_staff || auth.is_superuser
                    ?
                    <>
                    <li><Link to="/productgrouplist">Product Groups</Link></li>
                    <li><Link to="/cityofficelist">City Offices</Link></li>
                    <li><Link to="/roletypelist">Role Types</Link></li>
                    </>
                    :
                    <></>
                    }
                    {auth.is_superuser
                    ?
                    <li><Link to="/profileslist">Profiles</Link></li>
                    :
                    <></>
                    }
                </ul>
                <section className={styles.HomeUserWorkspace}>
                {outlet || aaa}
                </section>
                <p className={styles.HomeUserColumnt}></p>
            </div>
        </div>
    )
}