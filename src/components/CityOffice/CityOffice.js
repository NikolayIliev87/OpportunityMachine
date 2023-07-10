import styles from './CityOffice.module.css'

export const CityOffice = (props) => {

    return (
        <div className={styles.CityOfficeDetails}>
            <div>
                <h2>{props.name}</h2>
            </div>
            <button onClick={() => props.onDetailsClick(props.id)}>Details</button>
        </div>
    );
}