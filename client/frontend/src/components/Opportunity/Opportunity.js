import styles from './Opportunity.module.css'

export const Opportunity = (props) => {

    return (
        <div className={styles.OpportunityDetails}>
            <div className={styles.ProfileDetailsStatus} 
                style={{backgroundColor: props.status==="Won"
                ?'#96DAAD'
                :props.status==="Ongoing"?'#e7c994':'#E79494'}}>
                <div>{props.status}</div>
            </div>
            <div className={styles.OpportunityDetailsMainGroup}>
                <h2>{props.name}</h2>   
                <div className={styles.OpportunityDetailsInnerGroup}>
                    <div>
                        <h3>OppID: {props.id}</h3>
                        <h3>Owner: {props.username}</h3>
                    </div>
                    <div>
                        <h3>Create Date: {props.created_date}</h3>
                        <h3>Expected Close:{props.close_date}</h3>
                    </div>
                </div>
            </div>
            <button onClick={() => props.onDetailsClick(props.id)}>Details</button>
        </div>
    );
}