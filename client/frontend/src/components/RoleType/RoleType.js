import styles from './RoleType.module.css'

export const RoleType = (props) => {

    return (
        <div className={styles.RoleTypeDetails}>
            <div>
                <h2>{props.name}</h2>
            </div>
            <button onClick={() => props.onDetailsClick(props.id)}>Details</button>
        </div>
    );
}