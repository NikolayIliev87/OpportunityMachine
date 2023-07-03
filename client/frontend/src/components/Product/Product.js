import styles from './Product.module.css'

export const Product = (props) => {

    return (
        <div className={styles.ProductDetails}>
            <div>
                <h2>{props.name}</h2>
                <h3>Category: {props.group.name}</h3>
            </div>
            <button onClick={() => props.onDetailsClick(props.id)}>Details</button>
        </div>
    );
}