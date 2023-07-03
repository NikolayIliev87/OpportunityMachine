import styles from './Client.module.css'

export const Client = (props) => {

    return (
        <div className={styles.ClientDetails}>
            <div>
                <h2>{props.name}</h2>
                <h3><i class="fas fa-envelope"></i> {props.contact}</h3>
                <h3><i class="fas fa-city"></i> {props.city}</h3>
            </div>
            <button onClick={() => props.onDetailsClick(props.id)}>Details</button>
        </div>
    );
}