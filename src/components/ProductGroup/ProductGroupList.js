import styles from './ProductGroup.module.css'

import { useState, useContext, useEffect } from "react";

import { ProductGroup } from "./ProductGroup";
import { Pagination } from './Pagination';
import { ProductGroupCreate } from "./ProductGroupCreate";
import { ProductGroupDetails } from "./ProductGroupDetails";

import * as productGroupService from '../../services/productgroup_service'

import { AuthContext } from "../../contexts/AuthContext";

// import { Filter } from './Filter';


export const ProductGroupList = () => {
    const {auth} = useContext(AuthContext)

    const [productGroups, setProductGroups] = useState([]);
    useEffect(() => {
        productGroupService.getAllProductGroups()
            .then(productGroups => {setProductGroups(productGroups)})
      },[]);

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [productGroupsPerPage] = useState(10);
    
    const indexOfLastProductGroup = currentPage * productGroupsPerPage;
    const indexOfFirstProductGroup = indexOfLastProductGroup - productGroupsPerPage;
    const currentProductGroups = () => {
        if (productGroups) {
            return productGroups.slice(indexOfFirstProductGroup, indexOfLastProductGroup);
        }
        else {
            return productGroups
        }
    } 

    const paginateHandler = (number) => {
        setCurrentPage(number)
    }
    //   end pagination

    const [selectedProductGroup, setSelectedProductGroup] = useState(null);

    const onClientDetailsHandler = (productGroupID) => {
        productGroupService.getProductGroup(productGroupID)
            .then(productGroup => {setSelectedProductGroup(productGroup)})
    };

    const [newProductGroup, setNewProductGroup] = useState(null);

    const newProductGroupHandler = (ev) => {
        ev.preventDefault()
        setNewProductGroup(true)
    }

    const onCloseDetailsHandler = () => {
        setNewProductGroup(null)
        setSelectedProductGroup(null)
    };
    
    const onUpdateHandler = (productGroupData) => {
        productGroupService.updateProductGroup(productGroupData)
            .then( () =>
            productGroupService.getAllProductGroups()
                    .then(
                        productGroups => setProductGroups(productGroups),
                        ),
                onCloseDetailsHandler()
            )
    };

    const onCreateHandler = (productGroupData) => {
        productGroupService.createProductGroup(productGroupData)
            .then( () =>
                productGroupService.getAllProductGroups()
                    .then(
                        productGroups => setProductGroups(productGroups),
                        )
            )
            .then(
                onCloseDetailsHandler()
            )
    };

    return (
        <div className={styles.ProductGroups}>
            <>
                {selectedProductGroup && <ProductGroupDetails {...selectedProductGroup} 
                                                    onUpdateClick={onUpdateHandler} 
                                                    onCloseClick={onCloseDetailsHandler}
                />}
                {newProductGroup && <ProductGroupCreate 
                    onCreateClick={onCreateHandler} 
                    onCloseClick={onCloseDetailsHandler}
                />}
            </>
            <div className={styles.ProductGroupList}>
                {/* <h1>Product Groups List</h1> */}
                <div className={styles.ProductGroupRibbon}>
                    <button 
                        className={styles.CreateNewProductGroup} 
                        onClick={newProductGroupHandler}
                        hidden={!auth.is_superuser?true:false}
                    > ADD NEW CATEGORY</button>
                </div>
                {/* <div className={styles.ProductGroupsArray}> */}
                <ul>
                    {productGroups.length !== 0
                    ?
                    currentProductGroups().map(productGroup => 
                        <article className={styles.ProductGroupArticle} key={productGroup.id}>
                            <ProductGroup {...productGroup} onDetailsClick={onClientDetailsHandler} />
                        </article>
                    )
                    :
                    <p>No Categories to show!</p>
                    }
                </ul>
                <Pagination 
                    groupsPerPage={productGroupsPerPage} 
                    totalGroups={productGroups?productGroups.length:1}
                    paginate={paginateHandler}
                />
            </div>
        </div>
    );
}