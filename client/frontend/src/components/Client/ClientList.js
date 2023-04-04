import styles from './Client.module.css'

import { useState, useContext, useEffect } from "react";

import { Client } from "./Client";
import { Pagination } from './Pagination';
import { ClientDetails } from "./ClientDetails";
import { ClientCreate } from "./ClientCreate";

import * as clientService from '../../services/client_service'
import * as authService from '../../services/auth_service'

import { AuthContext } from "../../contexts/AuthContext";

// import { Filter } from './Filter';


export const ClientList = () => {
    const {auth} = useContext(AuthContext)

    const [cityOffices, setCityOffices] = useState([]);
    useEffect(() => {
      authService.getAllCityOffices()
          .then(cityOffices => {setCityOffices(cityOffices)})
    },[]);

    const [clients, setClients] = useState([]);
    useEffect(() => {
        clientService.getAllClients()
            .then(clients => {setClients(clients)})
      },[]);

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(10);
    
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = () => {
        if (clients) {
            return clients.slice(indexOfFirstClient, indexOfLastClient);
        }
        else {
            return clients
        }
    } 

    const paginateHandler = (number) => {
        setCurrentPage(number)
    }
    //   end pagination

    const [selectedClient, setSelectedClient] = useState(null);

    const onClientDetailsHandler = (clientID) => {
        clientService.getClient(clientID)
            .then(client => {setSelectedClient(client)})
    };

    const [newClient, setNewClient] = useState(null);

    const newClientHandler = (ev) => {
        ev.preventDefault()
        setNewClient(true)
    }

    const onCloseDetailsHandler = () => {
        setNewClient(null)
        setSelectedClient(null)
    };
    
    const onUpdateHandler = (clientData) => {
        clientService.updateClient(clientData)
            .then( () =>
            clientService.getAllClients()
                    .then(
                        clients => setClients(clients),
                        ),
                onCloseDetailsHandler()
            )
    };

    const onCreateHandler = (clientData) => {
        clientService.createClient(clientData)
            .then( () =>
                clientService.getAllClients()
                    .then(
                        clients => setClients(clients),
                        )
            )
            .then(
                onCloseDetailsHandler()
            )
    };

    // const onFilterHandler = (filterID) => {
    //     if (filterID!=='All') {
    //         ticketService.getAllTicketsFiltered(filterID)
    //                 .then(
    //                     tickets => setTickets(tickets)
    //                 )
    //     }
    //     else {
    //         ticketService.getAllTickets()
    //                 .then(
    //                     tickets => setTickets(tickets)
    //                 )
    //     }
    // }

    return (
        <div>
            <>
                {selectedClient && <ClientDetails {...selectedClient} 
                                                    onUpdateClick={onUpdateHandler} 
                                                    onCloseClick={onCloseDetailsHandler}
                                                    allCityOffices = {cityOffices}
                />}
                {newClient && <ClientCreate 
                    onCreateClick={onCreateHandler} 
                    onCloseClick={onCloseDetailsHandler}
                    allCityOffices = {cityOffices} 
                />}
            </>
            <div className={styles.ClientList}>
                <h1>Clients List</h1>
                {auth.is_superuser
                ?
                <button className={styles.CreateNewClient} onClick={newClientHandler}> ADD NEW CLIENT</button>
                :
                <></>
                }
                <div className={styles.ClientsArray}>
                {clients.length !== 0
                ?
                currentClients().map(client => 
                    <article key={client.id}>
                        <Client {...client} onDetailsClick={onClientDetailsHandler} />
                    </article>
                )
                :
                <p>No Clients to show!</p>
                }
                </div>
                <Pagination 
                    clientsPerPage={clientsPerPage} 
                    totalClients={clients?clients.length:1}
                    paginate={paginateHandler}
                />
            </div>
        </div>
    );
}