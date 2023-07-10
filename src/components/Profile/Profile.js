import styles from './ProfilesList.module.css'

export const Profile = (props) => {
    return (
        <div className={styles.ProfileDetails}>
            {props.is_deleted
            ?
            <div className={styles.ProfileDetailsStatusInactive}>
                <div>Blocked</div>
            </div>
            :
            <div className={styles.ProfileDetailsStatusActive}>
                <div>Active</div>
            </div>
            }
            <div className={styles.ProfileDetailsMainGroup}>
                <h2>{props.first_name} {props.last_name}</h2>
                <div className={styles.ProfileDetailsInnerGroup}>
                    <div>
                        <h3><i class="fas fa-envelope"></i>{props.user_email}</h3>
                        <h3>UserID: {props.user}</h3>
                    </div>
                    <div>
                        <h3>Role Type: {props.role_type.name}</h3>
                        <h3>Manager: {props.manager}</h3>
                    </div>
                </div>
            </div>
            {props.is_deleted
            ?
            <button onClick={() => props.onDeleteActivateClick(props)}>Activate</button>
            :
            <button onClick={() => props.onDeleteActivateClick(props)}>Block</button>
            }
        </div>
    );
}