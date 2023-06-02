import styles from './Opportunity.module.css'

import { useState, useContext, useEffect } from "react";

import { Opportunity } from "./Opportunity";
import { Pagination } from './Pagination';
import { OpportunityDetails } from "./OpportunityDetails";
import { OpportunityCreate } from "./OpportunityCreate";

import * as clientService from '../../services/client_service'
import * as opportunityService from '../../services/opportunity_service'
import * as authService from '../../services/auth_service'

import { AuthContext } from "../../contexts/AuthContext";

// import { Filter } from './Filter';


export const OpportunityList = () => {
    const {auth} = useContext(AuthContext)

    // const [cityOffices, setCityOffices] = useState([]);
    // useEffect(() => {
    //   authService.getAllCityOffices()
    //       .then(cityOffices => {setCityOffices(cityOffices)})
    // },[]);

    const [opportunities, setOpportunities] = useState([]);
    useEffect(() => {
        opportunityService.getAllOpportunities()
            .then(opportunity => {setOpportunities(opportunity)})
      },[]);

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [opportunitiesPerPage] = useState(10);
    
    const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
    const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
    const currentOpportunities = () => {
        if (opportunities) {
            return opportunities.slice(indexOfFirstOpportunity, indexOfLastOpportunity);
        }
        else {
            return opportunities
        }
    } 

    const paginateHandler = (number) => {
        setCurrentPage(number)
    }
    //   end pagination

    const [selectedOpportunity, setSelectedOpportunity] = useState(null);

    const onOpportunityDetailsHandler = (opportunityID) => {
        opportunityService.getOpportunity(opportunityID)
            .then(opportunity => {setSelectedOpportunity(opportunity)})
    };

    const [newOpportunity, setNewOpportunity] = useState(null);

    const newOpportunityHandler = (ev) => {
        ev.preventDefault()
        setNewOpportunity(true)
    }

    const onCloseDetailsHandler = () => {
        setNewOpportunity(null)
        setSelectedOpportunity(null)
    };
    
    const onUpdateHandler = (opportunityData) => {
        opportunityService.updateOpportunity(opportunityData)
            .then( () =>
            opportunityService.getAllOpportunities()
                    .then(
                        opportunities => setOpportunities(opportunities),
                        ),
                onCloseDetailsHandler()
            )
    };

    const onCreateHandler = (opportunityData) => {
        opportunityService.createOpportunity(opportunityData)
            .then( () =>
                opportunityService.getAllOpportunities()
                    .then(
                        opportunities => setOpportunities(opportunities),
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
                {selectedOpportunity && <OpportunityDetails {...selectedOpportunity} 
                                                    onUpdateClick={onUpdateHandler} 
                                                    onCloseClick={onCloseDetailsHandler}
                                                    // allCityOffices = {cityOffices}
                />}
                {newOpportunity && <OpportunityCreate 
                    onCreateClick={onCreateHandler} 
                    onCloseClick={onCloseDetailsHandler}
                    // allCityOffices = {cityOffices} 
                />}
            </>
            <div className={styles.OpportunityList}>
                <h1>Opportunities List</h1>
                {/* {auth.is_superuser
                ?
                <button 
                    className={styles.CreateNewOpportunity} 
                    onClick={newOpportunityHandler}
                > 
                ADD NEW OPPORTUNITY
                </button>
                :
                <></>
                } */}
                <button 
                    className={styles.CreateNewOpportunity} 
                    onClick={newOpportunityHandler}
                > 
                ADD NEW OPPORTUNITY
                </button>
                <div className={styles.OpportunitiesArray}>
                {opportunities.length !== 0
                ?
                currentOpportunities().map(opportunity => 
                    <article key={opportunity.id}>
                        <Opportunity {...opportunity} onDetailsClick={onOpportunityDetailsHandler} />
                    </article>
                )
                :
                <p>No Opportunities to show!</p>
                }
                </div>
                <Pagination 
                    opportunitiesPerPage={opportunitiesPerPage} 
                    totalOpportunities={opportunities?opportunities.length:1}
                    paginate={paginateHandler}
                />
            </div>
        </div>
    );
}