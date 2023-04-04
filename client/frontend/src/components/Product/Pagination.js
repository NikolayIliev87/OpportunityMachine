import { useState } from 'react';
import styles from './Product.module.css'

export const Pagination = (props) => {

    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1)

    const onPageClickHandler = (number) => {
        props.paginate(number)
        setCurrentPage(number)
    }

    for (let i = 1; i <= Math.ceil(props.totalProducts / props.productsPerPage ); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className={styles.ProductsPagination}>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button className={currentPage===number?"active":"inactive"} type="button" onClick={() => onPageClickHandler(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}