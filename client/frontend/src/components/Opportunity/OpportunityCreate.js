import styles from './Opportunity.module.css'

import { validator } from '../../services/validator';

import { useState, useEffect } from "react";

import * as clientService from '../../services/client_service'
import * as productService from '../../services/product_service'

export const OpportunityCreate = (props) => {
    const [errors, setErrors] = useState({});
    const [opportunity_products, setOpportunityProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem('auth'))['id']

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
          setErrors(state => ({
            ...state,
            [ev.target.id]: validated,
          }))
        }
      };

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
        <form className={styles.OpportunityNew} onSubmit={onSubmitHandler}>
            <h1>Add New Opportunity</h1>
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
                <div>
                    <label htmlFor="name">Opportunity Name:</label>
                    <input 
                        id='name' 
                        type="text"  
                        onChange={changeHandler} 
                        value={values.name}
                        onBlur={validateInputs} 
                    />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="description">Opportunity Description:</label>
                    <input 
                        id='description' 
                        type="text"  
                        onChange={changeHandler} 
                        value={values.description}
                        onBlur={validateInputs} 
                    />
                    {errors.description && <p>{errors.description}</p>}
                </div>
                <div>
                    <label htmlFor="close_date">Expected Close Date:</label>
                    <input 
                        id='close_date' 
                        type="date"
                        onChange={changeHandler} 
                        value={values.close_date}
                        onBlur={validateInputs} 
                    />
                    {errors.close_date && <p>{errors.close_date}</p>}
                </div>
                <div>
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
                    <div>
                        <button type="submit" >Create</button>
                        <button onClick={props.onCloseClick}>Close</button>
                    </div>
                </div>
            </section>
        </form>
    );
}