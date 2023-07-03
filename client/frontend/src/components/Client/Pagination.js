import { useState } from 'react';
import styles from './Client.module.css'

export const Pagination = (props) => {

    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1)

    const onPageClickHandler = (number) => {
        props.paginate(number)
        setCurrentPage(number)
    }

    for (let i = 1; i <= Math.ceil(props.totalClients / props.clientsPerPage ); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={styles.ClientsPagination}>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button className={currentPage===number?"active":"inactive"} type="button" onClick={() => onPageClickHandler(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}