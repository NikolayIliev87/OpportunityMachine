import styles from './Opportunity.module.css'
import Select from 'react-select';

import { useState, useContext, useEffect } from "react";
import { validator } from '../../services/validator';
import { 
    formatter, 
    calcClientProductPrice, 
    calcClientProductTotalNetPrice, 
    clacTotalProductsValue 
    } from '../../utils/currency_formater'

import * as productService from '../../services/product_service'

import { AuthContext } from "../../contexts/AuthContext";

export const OpportunityDetails = (props) => {
    const {auth} = useContext(AuthContext)
    const [errors, setErrors] = useState({});
    const [opportunity_products, setOpportunityProducts] = useState(props.products);
    const [selectedProduct, setSelectedProduct] = useState({});

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
    //     total = total + ((product.price-(product.price * (props.client.discount/100))) * quantity))

    //     return total;
    // }

    // const clacTotalProductsValue = () => {
    //     let total = 0;
    //     opportunity_products.map(({product,quantity}) => 
    //     total = total + calcClientProductTotalNetPrice(product.price, props.client.discount, 20, quantity))

    //     return total;
    // }

    const [products, setProducts] = useState([]);
    useEffect(() => {
        productService.getAllProducts()
            .then(products => {setProducts(products)})
      },[]);

    const [values, setValues] = useState({
        id: `${props.id}`,
        name: `${props.name}`,
        description: `${props.description}`,
        created_date: `${props.created_date}`,
        last_modified_date: `${props.last_modified_date}`,
        close_date: `${props.close_date}`,
        status: `${props.status}`,
        client: `${props.client.id}`,
        products: `${props.products}`,
        user: `${props.user}`,
    })

    const changeSelectHandler = (ev, element) => {
        if(element === 'product' && ev != null) {
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
        else {setValues(state => ({
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
        opportunityData.last_modified_date = new Date().toISOString().split('T')[0]

        if(ev.nativeEvent.submitter.name === 'update') {
            props.onUpdateClick(opportunityData)
        }
        // else if(ev.nativeEvent.submitter.name === 'delete') {
        //     const opportunityDataDelete = {...values, is_deleted: values.is_deleted==="false"?true:false}

        //     props.onUpdateClick(ticketDataDelete)
        // }
    }

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
        //   setErrors(state => ({
        //     ...state,
        //     [ev.target.id]: validated,
        //   }))
        // }
      }

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
          ev.preventDefault()
        //   let productselected = products.filter(item => item.id==ev.target.parentElement.childNodes[0].value)[0]
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
        <div className={styles.OpportunityData} >
            <form onSubmit={onSubmitHandler}>
                <h2>Opportunity Details</h2>
                <section>
                    <div className={styles.OpportunityDataMain}>
                        <div className={styles.OpportunityDataMainLines}>
                            <div className={styles.OpportunityDataMainLinesItem}>
                                <label htmlFor="name"  value={values.name} >Opp Name:</label>
                                <input
                                    readOnly={auth.is_superuser || auth.email == props.username?false:true} 
                                    id='name' 
                                    type="text"  
                                    onChange={changeHandler} 
                                    defaultValue={props.name}
                                    onBlur={validateInputs} 
                                />
                                {errors.name && <p>{errors.name}</p>}
                            </div>
                            <div className={styles.OpportunityDataMainLinesItem}>
                                <label htmlFor="id"  value={values.id} >Opp ID:</label>
                                <input
                                    disabled={true} 
                                    id='id' 
                                    type="text"  
                                    defaultValue={props.id}
                                />
                            </div>
                        </div>
                        <div className={styles.OpportunityDataMainLines}>
                            <div className={styles.OpportunityDataMainLinesItem}>
                                <label htmlFor="user"  value={values.user} >Owner:</label>
                                <input
                                    disabled={true} 
                                    id='user' 
                                    type="text"  
                                    defaultValue={props.username}
                                />
                            </div>
                            <div className={styles.OpportunityDataMainLinesItem}>
                                {auth.is_superuser || auth.email == props.username
                                ?
                                <>
                                <label htmlFor="status">Opp Status:</label>
                                <select 
                                    // readOnly={auth.is_superuser || auth.email == values.user?false:true} 
                                    id='status' 
                                    value={values.status} 
                                    onChange={changeHandler}
                                >
                                <option value='Ongoing' key='Ongoing'>Ongoing</option>
                                <option value='Lost' key='Lost'>Lost</option>
                                <option value='Won' key='Won'>Won</option>
                                </select>
                                </>
                                :
                                <>
                                <label htmlFor="status">Opportunity Status:</label>
                                <input
                                    readOnly={true} 
                                    id='status' 
                                    type="text"
                                    defaultValue={props.status}
                                />
                                </>
                                }
                                {/* <label htmlFor="status">Opportunity Status:</label>
                                <select 
                                    readOnly={auth.is_superuser || auth.email == values.user?false:true} 
                                    id='status' 
                                    value={values.status} 
                                    onChange={changeHandler}
                                >
                                <option value='Ongoing' key='Ongoing'>Ongoing</option>
                                <option value='Lost' key='Lost'>Lost</option>
                                <option value='Won' key='Won'>Won</option>
                                </select> */}
                            </div>
                        </div>
                        <div className={styles.OpportunityDataMainLines}>
                            <div className={styles.OpportunityDataMainLinesItem}>
                                <label htmlFor="client"  value={values.client.id} >Client:</label>
                                <input
                                    disabled={true} 
                                    id='client' 
                                    type="text"  
                                    defaultValue={props.client.name}
                                />
                            </div>
                            <div className={styles.OpportunityDataMainLinesItem}>
                                <label htmlFor="close_date"  value={values.close_date} >Close Date:</label>
                                <input
                                    readOnly={auth.is_superuser || auth.email == props.username?false:true} 
                                    id='close_date' 
                                    type="date"
                                    onChange={changeHandler} 
                                    defaultValue={props.close_date}
                                    onBlur={validateInputs} 
                                />
                                {errors.close_date && <p>{errors.close_date}</p>}
                            </div>
                        </div>
                        <div className={styles.OpportunityDataMainLines}>
                            <div className={styles.OpportunityDataMainLinesItem}>
                                <label htmlFor="created_date"  value={values.created_date} >Created Date:</label>
                                <input
                                    disabled={true}
                                    id='created_date' 
                                    type="date"  
                                    defaultValue={props.created_date}
                                />
                            </div>
                            <div className={styles.OpportunityDataMainLinesItem}>
                                <label htmlFor="last_modified_date"  value={values.last_modified_date} >Update Date:</label>
                                <input
                                    disabled={true}
                                    id='last_modified_date' 
                                    type="date"
                                    defaultValue={props.last_modified_date}
                                />
                            </div>
                        </div>
                        {auth.is_superuser
                        ?
                        <div className={styles.OpportunityDataMainLinesUser}>
                            <div className={styles.OpportunityDataMainLinesItemUser}>
                                <label htmlFor="user"  value={values.user}>
                                    Change UserID to perform opp ownership change:
                                </label>
                                <input
                                    id='user' 
                                    type='number'
                                    defaultValue={props.user}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                        :
                        <></>
                        }
                    </div>

                    <div className={styles.OpportunityDataProductInclude}>
                        {newProduct
                            ?
                            <div className={styles.OpportunityDataProductIncludeAction}>
                                <div className={styles.OpportunityDataProductIncludeActionSelect}>
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
                                hidden={auth.is_superuser || auth.email == props.username?false:true}
                            >
                                Include Product
                            </button>
                            <h3 className={styles.OpportunityDataProducts}>Included Products:</h3>
                            </>
                        } 
                    </div>
                    <div className={styles.OpportunityDataProductsTable}>
                        {opportunity_products.length !== 0
                        ?
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th className={styles.DataTableId}>ID</th>
                                        <th className={styles.DataTableName}>Name</th>
                                        <th className={styles.DataTableDetails}>Details</th>
                                        <th className={styles.DataTablePrice}>List Price</th>
                                        <th className={styles.DataTableDiscount}>Discont %</th>
                                        <th className={styles.DataTableClientPrice}>Client Price</th>
                                        <th className={styles.DataTableQuantity}>Qty</th>
                                        <th className={styles.DataTableVAT}>VAT %</th>
                                        <th className={styles.DataTableTotal}>Total</th>
                                    </tr>
                                </thead>
                                {opportunity_products.map(product => 
                                <tbody key={product.product.id}>
                                    <tr>
                                        <td className={styles.CellId}><div>{product.product.id}</div></td>
                                        <td className={styles.CellName}><div>{product.product.name}</div></td>
                                        <td className={styles.CellDetails}><div><p>{product.product.description}</p></div></td>
                                        <td className={styles.CellPrice}><div>{formatter.format(product.product.price)}</div></td>
                                        <td className={styles.CellDiscount}><div>{props.client.discount}%</div></td>
                                        <td className={styles.CellClientPrice}>
                                            <div>
                                                {formatter.format(calcClientProductPrice(
                                                    product.product.price,
                                                    props.client.discount
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
                                                    props.client.discount,
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
                                            hidden={auth.is_superuser || auth.email == props.username?false:true}
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
                            <span>{props.client.discount}%</span>
                            <span>
                                {(product.product.price - (product.product.price * (props.client.discount/100)))
                                 * product.quantity}</span>
                            <button 
                                onClick={event => onRemoveProductClick(event, product.product.id)}
                                hidden={auth.is_superuser || auth.email == props.username?false:true}
                            >remove</button>
                        </div>
                        )}
                        <div><span>Total before VAT </span><span>{clacTotalProductsValue()}</span></div>
                        <div><span>VAT</span><span>20%</span></div>
                        <div><span>Total after VAT </span><span>{clacTotalProductsValue()+clacTotalProductsValue()*(20/100)}</span></div> */}
                        </>
                        :
                        <p>No Products included!</p>
                        }
                    </div>
                    <div className={styles.OpportunityDataDescription}>
                        <div className={styles.OpportunityDataDescriptionArea}>
                            <label htmlFor="description"  value={values.description} >Description:</label>
                            <textarea
                                readOnly={auth.is_superuser || auth.email == props.username?false:true}  
                                id="description" 
                                onChange={changeHandler} 
                                defaultValue={props.description}
                                onBlur={validateInputs}
                            />
                            {/* <input
                                readOnly={auth.is_superuser || auth.email == props.username?false:true} 
                                id='description' 
                                type="text"  
                                onChange={changeHandler} 
                                defaultValue={props.description}
                                onBlur={validateInputs} 
                            /> */}
                            {errors.description && <p>{errors.description}</p>}
                        </div>
                        <div className={styles.DataGrandTotal}>
                            <span>Net Total</span>
                            <div>
                                {formatter.format(
                                    clacTotalProductsValue(opportunity_products, props.client)
                                )}
                                {/* {clacTotalProductsValue()+clacTotalProductsValue()*(20/100)}$ */}
                            </div>
                        </div>
                    </div>
                    <div className={styles.OpportunityDataButtons}>
                        {auth.is_superuser
                        ?
                        <button 
                            hidden={
                                values.name === '' || values.description === '' || 
                                values.close_date === ''?true:false}  
                            type="submit" 
                            name='update'
                        >Save</button>
                        :
                        <button 
                            hidden={auth.email !== props.username ||
                                values.name === '' || values.description === '' || 
                                values.close_date === ''?true:false}  
                            type="submit" 
                            name='update'
                        >Save</button>
                        }
                        {/* <button 
                        hidden={auth.is_superuser || auth.email == props.username?false:true}  
                        type="submit" name='update'
                        >
                        Save
                        </button> */}
                        <button onClick={props.onCloseClick}>Close</button>
                    </div>
                </section>
            </form>
        </div>
    );
}