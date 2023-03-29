import { useState } from 'react';
import styles from './ProfilesList.module.css';

export const PaginationProfiles = (props) => {

    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1)

    const onPageClickHandler = (e,number) => {
        props.paginate(number)
        setCurrentPage(number)
    }

    for (let i = 1; i <= Math.ceil(props.totalProfiles / props.profilesPerPage ); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className={styles.ProfilesPagination}>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button className={currentPage===number?"active":"inactive"} type="button" onClick={(e) => onPageClickHandler(e, number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}