import styles from './RoleType.module.css'

import { useState, useContext, useEffect } from "react";

import { RoleType } from "./RoleType";
import { Pagination } from './Pagination';
import { RoleTypeCreate } from "./RoleTypeCreate";
import { RoleTypeDetails } from "./RoleTypeDetails";

import * as authService from '../../services/auth_service'

import { AuthContext } from "../../contexts/AuthContext";

// import { Filter } from './Filter';


export const RoleTypeList = () => {
    const {auth} = useContext(AuthContext)

    const [roleTypes, setRoleTypes] = useState([]);
    useEffect(() => {
        authService.getAllRoleTypes()
            .then(roleTypes => {setRoleTypes(roleTypes)})
      },[]);

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [roleTypesPerPage] = useState(10);
    
    const indexOfLastRoleType = currentPage * roleTypesPerPage;
    const indexOfFirstRoleType = indexOfLastRoleType - roleTypesPerPage;
    const currentRoleTypes = () => {
        if (roleTypes) {
            return roleTypes.slice(indexOfFirstRoleType, indexOfLastRoleType);
        }
        else {
            return roleTypes
        }
    } 

    const paginateHandler = (number) => {
        setCurrentPage(number)
    }
    //   end pagination

    const [selectedRoleType, setSelectedRoleType] = useState(null);

    const onRoleTypeDetailsHandler = (roleTypeID) => {
        authService.getRoleType(roleTypeID)
            .then(roleType => {setSelectedRoleType(roleType)})
    };

    const [newRoleType, setNewRoleType] = useState(null);

    const newRoleTypeHandler = (ev) => {
        ev.preventDefault()
        setNewRoleType(true)
    }

    const onCloseDetailsHandler = () => {
        setNewRoleType(null)
        setSelectedRoleType(null)
    };
    
    const onUpdateHandler = (roleTypeData) => {
        authService.updateRoleType(roleTypeData)
            .then( () =>
                authService.getAllRoleTypes()
                    .then(
                        roleTypes => setRoleTypes(roleTypes),
                        ),
                onCloseDetailsHandler()
            )
    };

    const onCreateHandler = (roleTypeData) => {
        authService.createRoleType(roleTypeData)
            .then( () =>
                authService.getAllRoleTypes()
                    .then(
                        roleTypes => setRoleTypes(roleTypes),
                        )
            )
            .then(
                onCloseDetailsHandler()
            )
    };

    return (
        <div>
            <>
                {selectedRoleType && <RoleTypeDetails {...selectedRoleType} 
                                                    onUpdateClick={onUpdateHandler} 
                                                    onCloseClick={onCloseDetailsHandler}
                />}
                {newRoleType && <RoleTypeCreate 
                    onCreateClick={onCreateHandler} 
                    onCloseClick={onCloseDetailsHandler}
                />}
            </>
            <div className={styles.RoleTypeList}>
                <h1>Role Types List</h1>
                <button 
                    className={styles.CreateNewRoleType} 
                    onClick={newRoleTypeHandler}
                    hidden={!auth.is_superuser?true:false}
                > ADD NEW ROLE TYPE</button>
                <div className={styles.RoleTypesArray}>
                {roleTypes.length !== 0
                ?
                currentRoleTypes().map(roleType => 
                    <article key={roleType.id}>
                        <RoleType {...roleType} onDetailsClick={onRoleTypeDetailsHandler} />
                    </article>
                )
                :
                <p>No Role Types to show!</p>
                }
                </div>
                <Pagination 
                    rolesPerPage={roleTypesPerPage} 
                    totalRoles={roleTypes?roleTypes.length:1}
                    paginate={paginateHandler}
                />
            </div>
        </div>
    );
}