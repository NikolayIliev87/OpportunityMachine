import styles from './ProfilesList.module.css'

import { useEffect, useState } from "react";

import { Profile } from "./Profile";
import { PaginationProfiles } from './PaginationProfiles';

import { arraySearchProfiles } from "../../utils/search"

import * as profileService from '../../services/profile_service';

export const ProfilesList = () => {
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        profileService.getProfiles()
            .then(profiles => {setProfiles(profiles)})
      },[]);

    const [searchedProfiles, setSearchedProfiles] = useState([])
    useEffect(() => {
        setSearchedProfiles(profiles)
      },[profiles]);

    const onProfileDeleteActivateHandler = (profile) => {
        const values = {
            first_name: `${profile.first_name}`,
            last_name: `${profile.last_name}`,
            phone: `${profile.phone}`,
            photo_url: `${profile.photo_url}`,
            city_office: `${profile.city_office.id}`,
            manager: `${profile.manager===null?'':profile.manager}`,
            is_manager: `${profile.is_manager}`,
            role_type: `${profile.role_type.id}`,
            role_description: `${profile.role_description}`,
            managing_city_offices: profile.managing_city_offices.map((obj) => obj.id),
            user: `${profile.user}`,
            is_deleted: !profile.is_deleted,
        }
        profileService.updateProfile(values)
            .then(() =>
                profileService.getProfiles()
            .       then(profiles => setProfiles(profiles))
            );
    };

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [profilesPerPage] = useState(6);
    
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    // const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);
    const currentProfiles = () => {
        if (searchedProfiles) {
            return searchedProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
        }
        else {
            return searchedProfiles
        }
    } 

    const paginateHandler = (number) => {
        setCurrentPage(number)
    }
    //   end pagination

    const onSearchHandler = async (e) => {
        let value = e.target.value;
        if (value.length >= 1) {
          let search = await arraySearchProfiles(searchedProfiles, value);
          setSearchedProfiles(search)
        //   setCount(search.length)
        } else {
            setSearchedProfiles(profiles)
        //   setCount(products.length)
        }
      }

    const onProfileStatusHandler = (ev) => {
        ev.preventDefault()
        if (ev.target.value === "All") {
            profileService.getProfiles()
            .then(profiles => {setProfiles(profiles)})
        }
        else{
            setSearchedProfiles(profiles.filter(x => String(x.is_deleted) == ev.target.value))
        }
        // else{
        //     profileService.getProfiles()
        //     .then(profiles => {setProfiles(profiles.filter(x => String(x.is_deleted) == ev.target.value))})
        // }
    }

    return (
            <div className={styles.Profiles}>
                <div className={styles.ProfileList}>
                    <div className={styles.ProfileListRibbon}>
                            {/* Count:{count} */}
                        <div className={styles.ProfileListSearch}>
                            <label htmlFor="search">Search by</label>
                            <input 
                                type="text" 
                                id="search" 
                                placeholder="id/username..." 
                                onChange={onSearchHandler}/>
                        </div>
                        <div className={styles.ProfileFilter}>
                            <label>Status Filter:</label>
                            <button onClick={onProfileStatusHandler} value={"All"}>All</button>
                            <button onClick={onProfileStatusHandler} value={"false"}>Active</button>
                            <button onClick={onProfileStatusHandler} value={"true"}>Blocked</button>
                            
                        </div>
                    </div>
                    <ul>
                        {profiles.length !== 0
                        ?
                        currentProfiles().map(profile => 
                            <article className={styles.ProfileArticle} key={profile.user}>
                                <Profile {...profile} onDeleteActivateClick={onProfileDeleteActivateHandler} />
                            </article>
                        )
                        :
                        <p>No Profiles to show!</p>
                        }
                    </ul>
                    <PaginationProfiles 
                        profilesPerPage={profilesPerPage} 
                        totalProfiles={searchedProfiles?searchedProfiles.length:1}
                        paginate={paginateHandler}
                    />
                </div>
            </div>
    );
}