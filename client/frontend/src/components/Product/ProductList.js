import styles from './Product.module.css'

import { useState, useContext, useEffect } from "react";

import { Product } from "./Product";
import { Pagination } from './Pagination';
import { ProductDetails } from "./ProductDetails";
import { ProductCreate } from "./ProductCreate";

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

    // pagination client side
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = () => {
        if (products) {
            return products.slice(indexOfFirstProduct, indexOfLastProduct);
        }
        else {
            return products
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
        <div>
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
                <h1>Products List</h1>
                {auth.is_superuser
                ?
                <button className={styles.CreateNewProduct} onClick={newProductHandler}> ADD NEW PRODUCT</button>
                :
                <></>
                }
                <div className={styles.ProductsArray}>
                {products.length !== 0
                ?
                currentProducts().map(product => 
                    <article key={product.id}>
                        <Product {...product} onDetailsClick={onClientDetailsHandler} />
                    </article>
                )
                :
                <p>No Products to show!</p>
                }
                </div>
                <Pagination 
                    productsPerPage={productsPerPage} 
                    totalProducts={products?products.length:1}
                    paginate={paginateHandler}
                />
            </div>
        </div>
    );
}