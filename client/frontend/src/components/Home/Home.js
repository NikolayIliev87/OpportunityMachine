import { HomeGuest } from "./HomeGuest";
import { HomeUser } from "./HomeUser";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";


export const Home = () => {
    const {auth} = useContext(AuthContext)

    
    // const isLogIn = true

    return (
        // home can show 2 views for home not registered and regitered with num of tickets and some other stats
        <>{auth.id
            ?<HomeUser/>
            :<HomeGuest/>
            }
        </>
        

    )
}