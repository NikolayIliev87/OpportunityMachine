import styles from './ProfilesList.module.css'

import { useEffect, useState } from "react";

import { Profile } from "./Profile";
import { PaginationProfiles } from './PaginationProfiles';

import * as profileService from '../../services/profile_service';

export const ProfilesList = () => {
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        profileService.getProfiles()
            .then(profiles => setProfiles(profiles))
      },[]);

    const onProfileDeleteHandler = (profile) => {
        // const values = {
        //     first_name: `${profile.first_name}`,
        //     last_name: `${profile.last_name}`,
        //     phone: `${profile.phone}`,
        //     photo_url: `${profile.photo_url}`,
        //     user: `${profile.user}`,
        //     is_deleted: true,
        // }
        // profileService.updateProfile(values)
        //     .then(() =>
        //         profileService.getProfiles()
        //     .       then(profiles => setProfiles(profiles))
        //     );
    };

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [profilesPerPage] = useState(5);
    
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

    const paginateHandler = (number) => {
        setCurrentPage(number)
    }
    //   end pagination

    return (
            <div className={styles.ProfileList}>
                <h1>Active profiles without your own</h1>
                {currentProfiles.map(profile => 
                    <article key={profile.user}>
                        <Profile {...profile} onDeleteClick={onProfileDeleteHandler} />
                    </article>
                )}
            <PaginationProfiles 
                profilesPerPage={profilesPerPage} 
                totalProfiles={profiles.length}
                paginate={paginateHandler}
            />
            </div>
    );
}