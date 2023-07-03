import styles from './Opportunity.module.css'

import { useState, useContext, useEffect } from "react";

import { Opportunity } from "./Opportunity";
import { Pagination } from './Pagination';
import { OpportunityDetails } from "./OpportunityDetails";
import { OpportunityCreate } from "./OpportunityCreate";

import { arraySearchOpportunitiesGeneral, arraySearchOpportunitiesProduct,
    arraySearchOpportunitiesClient, arraySearchOpportunitiesDate } from "../../utils/search"

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
    
    const [searchedOpportunities, setSearchedOpportunities] = useState([])
    useEffect(() => {
        setSearchedOpportunities(opportunities)
      },[opportunities]);
    
    const [searchOption, setSearchOption] = useState('General');

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [opportunitiesPerPage] = useState(10);
    
    const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
    const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
    const currentOpportunities = () => {
        if (searchedOpportunities) {
            return searchedOpportunities.slice(indexOfFirstOpportunity, indexOfLastOpportunity);
        }
        else {
            return searchedOpportunities
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

    const onSearchTypeChangeHandler = (ev) => {
        setSearchOption(ev.target.value)
        setSearchedOpportunities(opportunities)
    }

    const onSearchHandler = async (e) => {
        let value = e.target.value;

        if (searchOption === "General") {
            if (value.length >= 1) {
            let search = await arraySearchOpportunitiesGeneral(searchedOpportunities, value);
            setSearchedOpportunities(search)
            } else {
                setSearchedOpportunities(opportunities)
            }
        }
        else if (searchOption === "Product") {
            if (value.length >= 1) {
                let search = await arraySearchOpportunitiesProduct(searchedOpportunities, value);
                setSearchedOpportunities(search)
                } else {
                    setSearchedOpportunities(opportunities)
                }
        }
        else if (searchOption === "Client") {
            if (value.length >= 1) {
                let search = await arraySearchOpportunitiesClient(searchedOpportunities, value);
                setSearchedOpportunities(search)
                } else {
                    setSearchedOpportunities(opportunities)
                }
        }
        else if (searchOption === "Date") {
            let start_date = 'all'
            let end_date = 'all'

            if (e.target.value === '' && e.target.id === "start_date") {
                start_date = 'all'
            }

            else if (e.target.value === '' && e.target.id === "end_date") {
                end_date = 'all'
            }

            else if (e.target.value !== '' && e.target.id === "start_date") {
                start_date = new Date(e.target.value).getTime()
            }
            else if (e.target.value !== '' && e.target.id === "end_date") {
                end_date = new Date(e.target.value).getTime()
            }

            if (start_date !== 'all' || end_date !== 'all') {
                let search = await arraySearchOpportunitiesDate(searchedOpportunities, start_date, end_date);
                setSearchedOpportunities(search)
                } else {
                    setSearchedOpportunities(opportunities)
                }
        }
      }

      const onOpportunityStatusHandler = (ev) => {
            ev.preventDefault()
            if (ev.target.value === "All") {
                opportunityService.getAllOpportunities()
                .then(opportunities => {setOpportunities(opportunities)})
            }
            else{
                setSearchedOpportunities(opportunities.filter(x => x.status === ev.target.value))
            }
        }

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
        <div className={styles.Opportunities}>
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
                {/* <h1>Opportunities List</h1> */}
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
                <div className={styles.OpportunityListRibbon}>
                    <button 
                        className={styles.CreateNewOpportunity} 
                        onClick={newOpportunityHandler}
                        // hidden={auth.is_staff?true:false}
                    > 
                    ADD NEW OPPORTUNITY
                    </button>
                    <div className={styles.OpportunityListSearch}>
                        <div>
                            <label htmlFor="searchoption">Search by</label>
                            <select id="searchoption" value={searchOption} onChange={onSearchTypeChangeHandler}>
                                <option value="General">General</option>
                                <option value="Product">Product</option>
                                <option value="Client">Client</option>
                                <option value="Date">Close Date</option>
                            </select>
                        </div>
                        {searchOption==="Date"
                        ?
                        <div className={styles.OpportunityListSearchDate}>
                            {/* Count:{count} */}
                            <span>between</span>
                            <input 
                                id='start_date' 
                                type="date"
                                onChange={onSearchHandler} 
                            />
                            <span>and</span>
                            <input 
                                id='end_date' 
                                type="date"
                                onChange={onSearchHandler} 
                            />
                        </div>
                        :
                        <div>
                            {/* Count:{count} */}
                            <input 
                                type="text" 
                                id="search"
                                placeholder={searchOption==="General"
                                            ?
                                            "by opp id/name/owner"
                                            :
                                            "by id/name"
                                            }
                                onChange={onSearchHandler}/>
                        </div>
                        }
                    </div>
                    <div className={styles.OpportunityFilter}>
                        <label>Status Filter:</label>
                        <button onClick={onOpportunityStatusHandler} value={"All"}>All</button>
                        <button onClick={onOpportunityStatusHandler} value={"Ongoing"}>Ongoing</button>
                        <button onClick={onOpportunityStatusHandler} value={"Lost"}>Lost</button>
                        <button onClick={onOpportunityStatusHandler} value={"Won"}>Won</button>
                            
                    </div>
                </div>
                <ul>
                {opportunities.length !== 0
                ?
                currentOpportunities().map(opportunity => 
                    <article className={styles.OpportunityArticle} key={opportunity.id}>
                        <Opportunity {...opportunity} onDetailsClick={onOpportunityDetailsHandler} />
                    </article>
                )
                :
                <p>No Opportunities to show!</p>
                }
                </ul>
                <Pagination 
                    opportunitiesPerPage={opportunitiesPerPage} 
                    totalOpportunities={opportunities?opportunities.length:1}
                    paginate={paginateHandler}
                />
            </div>
        </div>
    );
}