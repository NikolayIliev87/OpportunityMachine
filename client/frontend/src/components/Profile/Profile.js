export const Profile = (props) => {
    return (
        <>  
            {props.is_deleted
            ?
            <div>Deleted</div>
            :
            <div>Active</div>
            }
            <h2><span>Name:</span><span>{props.first_name} {props.last_name}</span></h2>
            <h2><span>Phone:</span><span>{props.phone}</span></h2>
            <h2><span>City Office:</span><span>{props.city_office.name}</span></h2>
            <h2><span>Is Manager:</span><span>{props.is_manager?'yes':'no'}</span></h2>
            <h2><span>Role Type:</span><span>{props.role_type.name}</span></h2>
            <h2><span>Role Description:</span><span>{props.role_description}</span></h2>
            <h2><span>UserID:</span><span>{props.user}</span></h2>
            <h2><span>UserName:</span><span>{props.user_email}</span></h2>
            <h2><span>Manager:</span><span>{props.manager}</span></h2>
            {props.is_deleted
            ?
            <button onClick={() => props.onDeleteActivateClick(props)}>Activate</button>
            :
            <button onClick={() => props.onDeleteActivateClick(props)}>Deactivate</button>
            }
        </>
    );
}