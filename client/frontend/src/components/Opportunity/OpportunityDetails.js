import styles from './Opportunity.module.css'

import { useState, useContext, useEffect } from "react";
import { validator } from '../../services/validator';

import * as productService from '../../services/product_service'

import { AuthContext } from "../../contexts/AuthContext";

export const OpportunityDetails = (props) => {
    const {auth} = useContext(AuthContext)
    
    const [errors, setErrors] = useState({});

    const [opportunity_products, setOpportunityProducts] = useState(props.products);


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
        user: `${auth.id}`,
    })

    const changeHandler = (ev) => {
        setValues(state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
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
          setErrors(state => ({
            ...state,
            [ev.target.id]: validated,
          }))
        }
      }

      const [newProduct, setNewProduct] = useState(null);

      const onIncludeProductClick = (ev) => {
          ev.preventDefault()
          setNewProduct(true)
      };
  
      const onCancleProductClick = (ev) => {
          ev.preventDefault()
          setNewProduct(null)
      };
        
      const onAddProductClick = ev => {
          ev.preventDefault()
          let productselected = products.filter(item => item.id==ev.target.parentElement.childNodes[0].value)[0]
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
      }

      const onRemoveProductClick = (ev, key) => {
        ev.preventDefault()
        setOpportunityProducts(state => state.filter(x => x.product.id != key))
      }

    return (
            <form className={styles.OpportunityDetails} onSubmit={onSubmitHandler}>
                <h1>Opportunity Details</h1>
                <section>
                    <div>
                        <label htmlFor="name"  value={values.name} >Opportunity Name:</label>
                        <input
                            readOnly={auth.is_superuser || auth.email == values.user?false:true} 
                            id='name' 
                            type="text"  
                            onChange={changeHandler} 
                            defaultValue={props.name}
                            onBlur={validateInputs} 
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="id"  value={values.id} >Opportunity ID:</label>
                        <input
                            disabled={true} 
                            id='id' 
                            type="text"  
                            defaultValue={props.id}
                        />
                    </div>
                    <div>
                        <label htmlFor="user"  value={values.user} >Owner:</label>
                        <input
                            disabled={true} 
                            id='user' 
                            type="text"  
                            defaultValue={props.username}
                        />
                    </div>
                    <div>
                        <label htmlFor="description"  value={values.description} >Opportunity Description:</label>
                        <input
                            readOnly={auth.is_superuser || auth.email == values.user?false:true} 
                            id='description' 
                            type="text"  
                            onChange={changeHandler} 
                            defaultValue={props.description}
                            onBlur={validateInputs} 
                        />
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    <div>
                        <label htmlFor="client"  value={values.client.id} >Client:</label>
                        <input
                            disabled={true} 
                            id='client' 
                            type="text"  
                            defaultValue={props.client.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="created_date"  value={values.created_date} >Created Date:</label>
                        <input
                            disabled={true}
                            id='created_date' 
                            type="date"  
                            defaultValue={props.created_date}
                        />
                    </div>
                    <div>
                        <label htmlFor="last_modified_date"  value={values.last_modified_date} >Last Modified Date:</label>
                        <input
                            disabled={true}
                            id='last_modified_date' 
                            type="date"
                            defaultValue={props.last_modified_date}
                        />
                    </div>
                    <div>
                        <label htmlFor="close_date"  value={values.close_date} >Close Date:</label>
                        <input
                            readOnly={auth.is_superuser || auth.email == values.user?false:true} 
                            id='close_date' 
                            type="date"
                            onChange={changeHandler} 
                            defaultValue={props.close_date}
                            onBlur={validateInputs} 
                        />
                        {errors.close_date && <p>{errors.close_date}</p>}
                    </div>
                    <div>
                        <label htmlFor="status">Opportunity Status:</label>
                        <select 
                            readOnly={auth.is_superuser || auth.email == values.user?false:true} 
                            id='status' 
                            value={values.status} 
                            onChange={changeHandler}
                        >
                         <option value='Ongoing' key='Ongoing'>Ongoing</option>
                         <option value='Lost' key='Lost'>Lost</option>
                         <option value='Won' key='Won'>Won</option>
                        </select>
                    </div>
                    
                    <div>Included Products:
                        {opportunity_products.length !== 0
                        ?
                        opportunity_products.map(product => 
                        <div key={product.product.id}>
                            <span>{product.product.name}</span>
                            <span>{product.quantity}</span>
                            <span>{product.product.price}</span>
                            <button onClick={event => onRemoveProductClick(event, product.product.id)}>remove</button>
                        </div>
                        )
                        :
                        <p>No Products included!</p>
                        }
                    </div>
                    <div>
                        <div> 
                            <button onClick={onIncludeProductClick}>Include Product</button>
                            {newProduct
                            ?
                            <div>
                                <select id='product' value={products.id}>
                                    <>
                                    <option value=""></option>
                                    {products.map(product => 
                                        <option value={product.id} key={product.id}>
                                            {product.name}
                                        </option>
                                    )}
                                    </>
                                </select>
                                <input type="number" min='0'/>

                                <button onClick={onAddProductClick}>Add</button>
                                <button onClick={onCancleProductClick}>Cancle</button>
                            </div>
                            :
                            <></>
                            } 
                        </div>
                        <div>
                            <button 
                            hidden={auth.is_superuser || auth.email == values.user?false:true}  
                            type="submit" name='update'
                            >
                            Save
                            </button>
                            <button onClick={props.onCloseClick}>Close</button>
                        </div>
                    </div>

                </section>
            </form>
    );
}