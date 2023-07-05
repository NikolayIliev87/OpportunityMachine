import styles from './Product.module.css'

import { useState, useContext, useEffect } from "react";

import { Product } from "./Product";
import { Pagination } from './Pagination';
import { ProductDetails } from "./ProductDetails";
import { ProductCreate } from "./ProductCreate";

import { arraySearchProduct } from "../../utils/search"

import * as productService from '../../services/product_service'
import * as productGroupService from '../../services/productgroup_service'
import * as authService from '../../services/auth_service'

import { AuthContext } from "../../contexts/AuthContext";

// import { Filter } from './Filter';


export const ProductList = () => {
    const {auth} = useContext(AuthContext)

    const [productGroups, setProductGroups] = useState([]);
    useEffect(() => {
        productGroupService.getAllProductGroups()
          .then(productGroups => {setProductGroups(productGroups)})
    },[]);
    
    const [products, setProducts] = useState([]);
    useEffect(() => {
        productService.getAllProducts()
            .then(products => {setProducts(products)})
      },[]);

    const [searchedproducts, setSearchedProducts] = useState([])
    useEffect(() => {
        setSearchedProducts(products)
      },[products]);
    // const [count, setCount] = useState(searchedproducts.length)

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = () => {
        if (searchedproducts) {
            return searchedproducts.slice(indexOfFirstProduct, indexOfLastProduct);
        }
        else {
            return searchedproducts
        }
    } 

    const paginateHandler = (number) => {
        setCurrentPage(number)
    }
    //   end pagination

    const [selectedProduct, setSelectedProduct] = useState(null);

    const onClientDetailsHandler = (productID) => {
        productService.getProduct(productID)
            .then(product => {setSelectedProduct(product)})
    };

    const [newProduct, setNewProduct] = useState(null);

    const newProductHandler = (ev) => {
        ev.preventDefault()
        setNewProduct(true)
    }

    const onCloseDetailsHandler = () => {
        setNewProduct(null)
        setSelectedProduct(null)
    };
    
    const onUpdateHandler = (productData) => {
        productService.updateProduct(productData)
            .then( () =>
            productService.getAllProducts()
                    .then(
                        products => setProducts(products),
                        ),
                onCloseDetailsHandler()
            )
    };

    const onCreateHandler = (productData) => {
        productService.createProduct(productData)
            .then( () =>
            productService.getAllProducts()
                    .then(
                        products => setProducts(products),
                        )
            )
            .then(
                onCloseDetailsHandler()
            )
    };
    const onSearchHandler = async (e) => {
        let value = e.target.value;
        if (value.length >= 1) {
          let search = await arraySearchProduct(searchedproducts, value);
          setSearchedProducts(search)
        //   setCount(search.length)
        } else {
          setSearchedProducts(products)
        //   setCount(products.length)
        }
      }
    
    const onGroupFilterHandler = (ev) => {
        ev.preventDefault()
        if (ev.target.value === "All") {
            productService.getAllProducts()
            .then(products => {setProducts(products)})
        }
        else{
            setSearchedProducts(products.filter(x => x.group.name === ev.target.value))
        }
        // else{
        //     productService.getAllProducts()
        //     .then(products => {setProducts(products.filter(x => x.group.name === ev.target.value))})
        //     // setProducts(filteredProducts)
        // }
    }

    // const onFilterHandler = (filterID) => {
    //     if (filterID!=='All') {
    //         ticketService.getAllTicketsFiltered(filterID)
    //                 .then(
    //                     tickets => setTickets(tickets)
    //                 )
    //     }
    //     else {
    //         ticketService.getAllTickets()
    //                 .then(
    //                     tickets => setTickets(tickets)
    //                 )
    //     }
    // }

    return (
        <div className={styles.Products}>
            <>
                {selectedProduct && <ProductDetails {...selectedProduct} 
                                                    onUpdateClick={onUpdateHandler} 
                                                    onCloseClick={onCloseDetailsHandler}
                                                    allProductGroups = {productGroups}
                />}
                {newProduct && <ProductCreate 
                    onCreateClick={onCreateHandler} 
                    onCloseClick={onCloseDetailsHandler}
                    allProductGroups = {productGroups}
                />}
            </>
            <div className={styles.ProductList}>
                {/* <h1>Products List</h1> */}
                <div className={styles.ProductRibbon}>
                    <button 
                        className={styles.CreateNewProduct} 
                        onClick={newProductHandler}
                        hidden={!auth.is_superuser && !auth.is_staff?true:false}
                    > ADD NEW PRODUCT</button>
                    <div className={styles.ProductListSearch}>
                        {/* Count:{count} */}
                        <label htmlFor="search">Search by</label>
                        <input 
                            type="text" 
                            id="search" 
                            placeholder="id/name/description..." 
                            onChange={onSearchHandler}/>
                    </div>
                    <div className={styles.ProductFilter}>
                        <label>Categories Filter:</label>
                        <button onClick={onGroupFilterHandler} value={"All"}>All</button>
                        {productGroups.map(group =>
                            <button 
                                key={group.id} 
                                value={group.name}
                                onClick={onGroupFilterHandler}
                                >{group.name}</button>
                            )}
                    </div>
                </div>
                <ul>
                {products.length !== 0
                ?
                currentProducts().map(product => 
                    <article className={styles.ProductArticle} key={product.id}>
                        <Product {...product} onDetailsClick={onClientDetailsHandler} />
                    </article>
                )
                :
                <p>No Products to show!</p>
                }
                </ul>
                <Pagination 
                    productsPerPage={productsPerPage} 
                    totalProducts={searchedproducts?searchedproducts.length:1}
                    paginate={paginateHandler}
                />
            </div>
        </div>
    );
}