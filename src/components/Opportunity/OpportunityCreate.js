import styles from './Opportunity.module.css'
import Select from 'react-select';

import { validator } from '../../services/validator';
import { 
        formatter, 
        calcClientProductPrice, 
        calcClientProductTotalNetPrice, 
        clacTotalProductsValue 
        } from '../../utils/currency_formater'

import { useState, useEffect } from "react";

import * as clientService from '../../services/client_service'
import * as productService from '../../services/product_service'

export const OpportunityCreate = (props) => {
    const [errors, setErrors] = useState({});
    const [opportunity_products, setOpportunityProducts] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});
    const [selectedProduct, setSelectedProduct] = useState({});
    const user = JSON.parse(localStorage.getItem('auth'))['id']


    // const calcClientProductPrice = (price, discount) => {
    //     let total = price - (price * (discount/100))
        
    //     return total
    // }

    // const calcClientProductTotalNetPrice = (price, discount, VAT, quantity) => {
    //     let clientPrice = price - (price * (discount/100))
    //     let total = (clientPrice + (clientPrice * (VAT/100))) * quantity

    //     return total
    // }

    // const clacTotalProductsValue = () => {
    //     let total = 0;
    //     opportunity_products.map(({product,quantity}) => 
    //     total = total + ((product.price-(product.price * (selectedClient[0].discount/100))) * quantity))

    //     return total;
    // }

    // const clacTotalProductsValue = () => {
    //     let total = 0;
    //     opportunity_products.map(({product,quantity}) => 
    //     total = total + calcClientProductTotalNetPrice(product.price, selectedClient[0].discount, 20, quantity))

    //     return total;
    // }


    // const uid = function(){
    //     return `${Date.now()}${user}`
    // }

    const [values, setValues] = useState({
        // opportunity_id: uid(),
        name: '',
        description: '',
        // last_modified_date: new Date().toISOString().split('T').join(" "),
        last_modified_date: new Date().toISOString().split('T')[0],
        close_date: '',
        status: 'Ongoing',
        client: '',
        user: user, 
    })

    const [clients, setClients] = useState([]);
    useEffect(() => {
        clientService.getAllClients()
            .then(clients => {setClients(clients)})
      },[]);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        productService.getAllProducts()
            .then(products => {setProducts(products)})
      },[]);

    const changeSelectHandler = (ev, element) => {
        // if(ev !== null) {
        //     setValues(state => ({
        //         ...state,
        //         [element]: ev.id
        //     })) 
        // }
        if(element === 'client' && ev != null) {
            setSelectedClient(clients.filter(x => x.id == ev.id))

            setValues(state => ({
                ...state,
                [element]: ev.id
            }))
        }
        else if (element === 'client' && ev == null) {
            setSelectedClient({})
            setOpportunityProducts([])
            setValues(state => ({
                ...state,
                [element]: ''
            }))
            setNewProduct(null)
        }
        else if(element === 'product' && ev != null) {
            setSelectedProduct(state => ({
                ...state,
                [element]: ev.id
            }))
        }
        else if (element === 'product' && ev == null) {
            setSelectedProduct({})
        }
    };

    const changeHandler = (ev) => {
        if (ev.target.id === 'quantity'){
            setSelectedProduct(state => ({
                ...state,
                [ev.target.id]: ev.target.value
            }))
        }
        else {
            setValues(state => ({
                ...state,
                [ev.target.id]: ev.target.value
            }))
        }
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const {...opportunityData} = values;
        let list_for_server = opportunity_products.map(x => ({...x, product:x.product.id}))
        opportunityData.products = list_for_server
        props.onCreateClick(opportunityData)
    };

    const validateInputs = (ev) => {
        let validated = validator(ev)
        if (validated) {
          setErrors(state => ({
            ...state,
            [ev.target.id]: validated,
          }))
        }
        else {
          setErrors({})
        }
        
        // else {
        //     setErrors(state => ({
        //       ...state,
        //       [ev.target.id]: validated,
        //     }))
        //   }
      };

    const [newProduct, setNewProduct] = useState(null);

    const onIncludeProductClick = (ev) => {
        ev.preventDefault()
        setNewProduct(true)
    };

    const onCancleProductClick = (ev) => {
        ev.preventDefault()
        setNewProduct(null)
        setSelectedProduct({})
    };
      
    const onAddProductClick = ev => {
        // console.log(ev.target.parentElement.childNodes[0].textContent.split(' - ')[0])
        ev.preventDefault()
        // let productselected = products.filter(item => item.id==ev.target.parentElement.childNodes[0].value)[0]
        let productselected = products.filter(item => 
            item.id==ev.target.parentElement.childNodes[0].textContent.split(' - ')[0])[0]
        let quantity = Number(ev.target.parentElement.childNodes[1].value)
        
        let is_existing = false

        for(let item of opportunity_products) {
            if (item.product.id == productselected.id) {
                let updatedproducts = [...opportunity_products]
                updatedproducts[opportunity_products.indexOf(item)].quantity += quantity
                setOpportunityProducts(updatedproducts)
                is_existing = true
            }
        }

        if (is_existing === false){
            setOpportunityProducts(state => [...state,{product: productselected, quantity: quantity}])
        }

        setNewProduct(null)
        setSelectedProduct({})
    }

    const onRemoveProductClick = (ev, key) => {
        ev.preventDefault()
        setOpportunityProducts(state => state.filter(x => x.product.id != key))
      }


    return (
        <div className={styles.OpportunityNew} >
            <form onSubmit={onSubmitHandler}>
                <h2>Add New Opportunity</h2>
                <section>   
                    {/* <div>
                        <label htmlFor="opportunity_id">Opportunity ID:</label>
                        <input 
                            id='opportunity_id' 
                            type="text"  
                            value={values.opportunity_id}
                            disabled={true}
                        />
                    </div> */}
                    <div className={styles.OpportunityNewMain}>
                        <div className={styles.OpportunityNewNameCustomer}>
                            <div className={styles.OpportunityNewName}>
                                <label htmlFor="name">Opp Name:</label>
                                <input 
                                    id='name' 
                                    type="text"  
                                    onChange={changeHandler} 
                                    value={values.name}
                                    onBlur={validateInputs}
                                    placeholder='Name' 
                                />
                                {errors.name && <p>{errors.name}</p>}
                            </div>
                            <div className={styles.OpportunityNewCustomer}>
                                <label htmlFor="client">Client:</label>
                                <div className={styles.OpportunityNewSelectDiv}>
                                    <Select
                                        id='client'
                                        options={clients}
                                        getOptionLabel={(option) => `${option.id} - ${option.name}`}
                                        getOptionValue={(option) => option.id}
                                        isSearchable={true}
                                        onChange={option => changeSelectHandler(option, "client")}
                                        placeholder={'Search Customer Name/ID'}
                                        isClearable

                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.OpportunityNewCloseDate}>
                            <label htmlFor="close_date">Close Date:</label>
                            <input 
                                id='close_date' 
                                type="date"
                                onChange={changeHandler} 
                                value={values.close_date}
                                onBlur={validateInputs} 
                            />
                            {errors.close_date && <p>{errors.close_date}</p>}
                        </div>
                    </div>
                    {/* <div>
                        <label htmlFor="client">Client:</label>
                        <select id='client' value={values.client} onChange={changeHandler}>
                            <>
                            <option value=""></option>
                            {clients.map(client => 
                                <option value={client.id} key={client.id}>
                                    {client.name}
                                </option>
                            )}
                            </>
                        </select>
                    </div> */}
                    <div className={styles.OpportunityNewProductInclude}>
                        {newProduct
                        ?
                        <div className={styles.OpportunityNewProductIncludeAction}>
                            <div className={styles.OpportunityNewProductIncludeActionSelect}>
                                <Select
                                    id='product'
                                    options={products}
                                    getOptionLabel={(option) => `${option.id} - ${option.name}`}
                                    getOptionValue={(option) => option.id}
                                    isSearchable={true}
                                    placeholder={'Search Product Name/ID'}
                                    onChange={option => changeSelectHandler(option, "product")}
                                    isClearable
                                />
                            </div>
                                {/* <select id='product' value={products.id}>
                                    <>
                                    <option value=""></option>
                                    {products.map(product => 
                                        <option value={product.id} key={product.id}>
                                            {product.name}
                                        </option>
                                    )}
                                    </>
                                </select> */}
                            <input 
                                type="number" 
                                min='0'
                                id='quantity'
                                value={selectedProduct.quantity?selectedProduct.quantity:''} 
                                onChange={changeHandler}
                                placeholder='Qty'
                            />

                            <button 
                                onClick={onAddProductClick}
                                disabled={selectedProduct.product && selectedProduct.quantity?false:true}
                            >
                                Add
                            </button>
                            <button onClick={onCancleProductClick}>Cancle</button>
                        </div>
                        :
                        <>
                        <button 
                            onClick={onIncludeProductClick}
                            disabled={selectedClient.length>0?false:true}
                        >
                            Include Product
                        </button>
                        <h3 className={styles.OpportunityNewProducts}>Included Products:</h3>
                        </>
                        }
                    </div>
                    <div className={styles.OpportunityNewProductsTable}>
                    {opportunity_products.length !== 0
                            ?
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className={styles.NewTableId}>ID</th>
                                            <th className={styles.NewTableName}>Name</th>
                                            <th className={styles.NewTableDetails}>Details</th>
                                            <th className={styles.NewTablePrice}>List Price</th>
                                            <th className={styles.NewTableDiscount}>Discont %</th>
                                            <th className={styles.NewTableClientPrice}>Client Price</th>
                                            <th className={styles.NewTableQuantity}>Qty</th>
                                            <th className={styles.NewTableVAT}>VAT %</th>
                                            <th className={styles.NewTableTotal}>Total</th>
                                        </tr>
                                    </thead>
                                    {opportunity_products.map(product => 
                                    <tbody key={product.product.id}>
                                        <tr>
                                            <td className={styles.CellId}><div>{product.product.id}</div></td>
                                            <td className={styles.CellName}><div>{product.product.name}</div></td>
                                            <td className={styles.CellDetails}><div><p>{product.product.description}</p></div></td>
                                            <td className={styles.CellPrice}><div>{formatter.format(product.product.price)}</div></td>
                                            <td className={styles.CellDiscount}><div>{selectedClient[0].discount}%</div></td>
                                            <td className={styles.CellClientPrice}>
                                                <div>
                                                    {formatter.format(calcClientProductPrice(
                                                        product.product.price,
                                                        selectedClient[0].discount
                                                    ))}
                                                    {/* (product.product.price 
                                                    - (product.product.price 
                                                    * (selectedClient[0].discount/100)
                                                    ))
                                                    // * product.quantity
                                                    }$ */}
                                                </div>
                                            </td>
                                            <td className={styles.CellQuantity}><div>{product.quantity}</div></td>
                                            <td className={styles.CellVAT}><div>20%</div></td>
                                            <td className={styles.CellTotal}>
                                                <div>
                                                    {formatter.format(calcClientProductTotalNetPrice(
                                                        product.product.price,
                                                        selectedClient[0].discount,
                                                        20,
                                                        product.quantity
                                                    ))}
                                                    {/* ((product.product.price 
                                                    - (product.product.price 
                                                    * (selectedClient[0].discount/100)
                                                    ))
                                                    +
                                                        (product.product.price 
                                                        - (product.product.price 
                                                        * (selectedClient[0].discount/100)
                                                        )
                                                        )
                                                        * 0.2
                                                    )
                                                    * product.quantity
                                                    }$ */}
                                                </div>
                                            </td>
                                            <button 
                                                onClick={event => 
                                                onRemoveProductClick(event, product.product.id)}
                                            >
                                                X
                                            </button>
                                        </tr>
                                    </tbody>
                                    )}
                                </table>
                                {/* {opportunity_products.map(product => 
                                <div key={product.product.id}>
                                    <span>{product.product.name}</span>
                                    <span>{product.quantity}</span>
                                    <span>{product.product.price}</span>
                                    <span>{product.product.price * product.quantity}</span>
                                    <span>{selectedClient[0].discount}%</span>
                                    <span>
                                            {(product.product.price - (product.product.price * (selectedClient[0].discount/100)))
                                            * product.quantity}</span>
                                    <button onClick={event => onRemoveProductClick(event, product.product.id)}>remove</button>
                                </div>
                                )}
                                <div><span>Total before VAT </span><span>{clacTotalProductsValue()}</span></div>
                                    <div><span>VAT</span><span>20%</span></div>
                                    <div><span>Total after VAT </span><span>{clacTotalProductsValue()+clacTotalProductsValue()*(20/100)}
                                </span></div> */}
                            </>
                            :
                            <p>No Products included!</p>
                            }
                    </div>
                    <div className={styles.OpportunityNewDescription}>
                        <div className={styles.OpportunityNewDescriptionArea}>
                            <label htmlFor="description">Description:</label>
                            <textarea 
                                id="description" 
                                onChange={changeHandler} 
                                value={values.description}
                                onBlur={validateInputs}
                            />
                            {/* <input 
                                id='description' 
                                type="text"  
                                onChange={changeHandler} 
                                value={values.description}
                                onBlur={validateInputs} 
                            /> */}
                            {errors.description && <p>{errors.description}</p>}
                        </div>
                        <div className={styles.NewGrandTotal}>
                            <span>Net Total</span>
                            <div>
                                {formatter.format(
                                    clacTotalProductsValue(opportunity_products, selectedClient[0])
                                )}
                                {/* {clacTotalProductsValue()+clacTotalProductsValue()*(20/100)}$ */}
                            </div>
                        </div>
                    </div>
                    <div className={styles.OpportunityNewButtons}>
                        <button 
                            type="submit"
                            hidden={Object.keys(errors).length > 0 || values.name === '' ||
                            values.description === '' || values.close_date === '' ||
                            values.client === ''
                            ?true:false} 
                        >
                            Create
                        </button>
                        <button onClick={props.onCloseClick}>Close</button>
                    </div>
                </section>
            </form>
        </div>
    );
}