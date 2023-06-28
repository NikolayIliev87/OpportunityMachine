import styles from './Home.module.css'

import {Link, Outlet} from 'react-router-dom'

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// import { TicketsContext } from "../../contexts/TicketsContext";



export const HomeUser = () => {
    const {auth} = useContext(AuthContext)
    // const {tickets} = useContext(TicketsContext)
    // const incomplete = tickets.filter(x => x['status'] === false)

    return (
        <div className={styles.HomeUser}>
            <h1>{auth.email} workspace</h1>
            {/* <h2>You have {tickets.length} tickets issued out of which {incomplete.length} still not closed</h2> */}
            <div>
                <ul>
                    <li><Link to="/clientlist">Clients</Link></li>
                    <li><Link to="/productgrouplist">Product Groups</Link></li>
                    <li><Link to="/productlist">Products</Link></li>
                    <li><Link to="/cityofficelist">City Offices</Link></li>
                    <li><Link to="/roletypelist">Role Types</Link></li>
                    <li><Link to="/opportunitylist">Opportunities</Link></li>
                    {auth.is_superuser
                    ?
                    <li><Link to="/profileslist">Profiles</Link></li>
                    :
                    <></>
                    }
                </ul>
                <Outlet/>
                <p></p>
            </div>
        </div>
    )
}