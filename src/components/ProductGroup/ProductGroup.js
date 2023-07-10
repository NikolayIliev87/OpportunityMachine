import styles from './ProductGroup.module.css'

export const ProductGroup = (props) => {

    return (
        <>
        <div className={styles.ProductGroupDetails}>
            <div>
                <h2>{props.name}</h2>
            </div>
            <button onClick={() => props.onDetailsClick(props.id)}>Details</button>
        </div>
        </>
    );
}