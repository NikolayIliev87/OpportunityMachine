import styles from './CityOffice.module.css'

import { useState, useContext, useEffect } from "react";

import { CityOffice } from "./CityOffice";
import { Pagination } from './Pagination';
import { CityOfficeCreate } from "./CityOfficeCreate";
import { CityOfficeDetails } from "./CityOfficeDetails";

import * as authService from '../../services/auth_service'

import { AuthContext } from "../../contexts/AuthContext";

// import { Filter } from './Filter';


export const CityOfficeList = () => {
    const {auth} = useContext(AuthContext)

    const [cityOffices, setCityOffices] = useState([]);
    useEffect(() => {
        authService.getAllCityOffices()
            .then(cityOffices => {setCityOffices(cityOffices)})
      },[]);

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [cityOfficesPerPage] = useState(10);
    
    const indexOfLastCityOffice = currentPage * cityOfficesPerPage;
    const indexOfFirstCityOffice = indexOfLastCityOffice - cityOfficesPerPage;
    const currentCityOffices = () => {
        if (cityOffices) {
            return cityOffices.slice(indexOfFirstCityOffice, indexOfLastCityOffice);
        }
        else {
            return cityOffices
        }
    } 

    const paginateHandler = (number) => {
        setCurrentPage(number)
    }
    //   end pagination

    const [selectedCityOffice, setSelectedCityOffice] = useState(null);

    const onCityOfficeDetailsHandler = (cityOfficeID) => {
        authService.getCityOffice(cityOfficeID)
            .then(cityOffice => {setSelectedCityOffice(cityOffice)})
    };

    const [newCityOffice, setNewCityOffice] = useState(null);

    const newCityOfficeHandler = (ev) => {
        ev.preventDefault()
        setNewCityOffice(true)
    }

    const onCloseDetailsHandler = () => {
        setNewCityOffice(null)
        setSelectedCityOffice(null)
    };
    
    const onUpdateHandler = (cityOfficeData) => {
        authService.updateCityOffice(cityOfficeData)
            .then( () =>
                authService.getAllCityOffices()
                    .then(
                        cityOffices => setCityOffices(cityOffices),
                        ),
                onCloseDetailsHandler()
            )
    };

    const onCreateHandler = (cityOfficeData) => {
        authService.createCityOffice(cityOfficeData)
            .then( () =>
                authService.getAllCityOffices()
                    .then(
                        cityOffices => setCityOffices(cityOffices),
                        )
            )
            .then(
                onCloseDetailsHandler()
            )
    };

    return (
        <div>
            <>
                {selectedCityOffice && <CityOfficeDetails {...selectedCityOffice} 
                                                    onUpdateClick={onUpdateHandler} 
                                                    onCloseClick={onCloseDetailsHandler}
                />}
                {newCityOffice && <CityOfficeCreate 
                    onCreateClick={onCreateHandler} 
                    onCloseClick={onCloseDetailsHandler}
                />}
            </>
            <div className={styles.CityOfficeList}>
                <h1>City Offices List</h1>
                {auth.is_superuser
                ?
                <button className={styles.CreateNewCityOffice} onClick={newCityOfficeHandler}> ADD NEW CITY OFFICE</button>
                :
                <></>
                }
                <div className={styles.CityOfficesArray}>
                {cityOffices.length !== 0
                ?
                currentCityOffices().map(cityOffice => 
                    <article key={cityOffice.id}>
                        <CityOffice {...cityOffice} onDetailsClick={onCityOfficeDetailsHandler} />
                    </article>
                )
                :
                <p>No City Offices to show!</p>
                }
                </div>
                <Pagination 
                    officesPerPage={cityOfficesPerPage} 
                    totalOffices={cityOffices?cityOffices.length:1}
                    paginate={paginateHandler}
                />
            </div>
        </div>
    );
}