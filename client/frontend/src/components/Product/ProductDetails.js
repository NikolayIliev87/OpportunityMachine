import styles from './Product.module.css'

import { useState, useContext, useEffect } from "react";
import { validator } from '../../services/validator';

import * as productService from '../../services/product_service'

import { AuthContext } from "../../contexts/AuthContext";

export const ProductDetails = (props) => {
    const {auth} = useContext(AuthContext)
    
    const [errors, setErrors] = useState({});

    // const [clients, setClients] = useState([]);
    // useEffect(() => {
    //     clientService.getAllClients()
    //         .then(clients => {setClients(clients)})
    //   },[]);

    const [values, setValues] = useState({
        id: `${props.id}`,
        name: `${props.name}`,
        description: `${props.description}`,
        price: `${props.price}`,
        group: `${props.group.id}`,
        is_deleted: `${props.is_deleted}`,
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

        const {...productData} = values;

        if(ev.nativeEvent.submitter.name === 'update') {
            props.onUpdateClick(productData)
        }
        else if(ev.nativeEvent.submitter.name === 'delete') {
            const productDataDelete = {...values, is_deleted: values.is_deleted==="false"?true:false}

            props.onUpdateClick(productDataDelete)
        }
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

    return (
            <form className={styles.ProductDetails} onSubmit={onSubmitHandler}>
                <h1>Product Details</h1>
                <section>
                    <div>
                        <label htmlFor="name"  value={values.name} >Product Name:</label>
                        <input
                            readOnly={auth.is_superuser?false:true} 
                            id='name' 
                            type="text"  
                            onChange={changeHandler} 
                            defaultValue={props.name}
                            onBlur={validateInputs} 
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="id"  value={values.id} >Customer ID:</label>
                        <input
                            disabled={true} 
                            id='id' 
                            type="text"  
                            defaultValue={props.id}
                        />
                    </div>
                    <div>
                        <label htmlFor="description"  value={values.description} >Product Description:</label>
                        <input
                            readOnly={auth.is_superuser?false:true} 
                            id='description' 
                            type="text"  
                            onChange={changeHandler} 
                            defaultValue={props.description}
                            onBlur={validateInputs} 
                        />
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    <div>
                        <label htmlFor="group">Product Group:</label>
                        <select 
                            disabled={auth.is_superuser?false:true} 
                            id='group' 
                            value={values.group.id} 
                            onChange={changeHandler}
                        >
                            {props.allProductGroups.map(productGroup => 
                                <option value={productGroup.id} key={productGroup.id}>
                                    {productGroup.name}
                                </option>
                            )}
                        </select>
                    </div> 
                    <div>
                        <label htmlFor="price"  value={values.price} >Customer Address:</label>
                        <input
                            readOnly={auth.is_superuser?false:true} 
                            id='price' 
                            type="text"  
                            onChange={changeHandler} 
                            defaultValue={props.price}
                            onBlur={validateInputs} 
                        />
                        {errors.price && <p>{errors.price}</p>}
                    </div>
                    <div>
                        <button 
                            hidden={!auth.is_superuser || Object.keys(errors).length > 0 ||
                                values.name === '' || values.description === '' || 
                                values.price === '' || values.group === ''?true:false}
                            type="submit" 
                            name='update'
                        >Save</button>
                        <button 
                            hidden={!auth.is_superuser || Object.keys(errors).length > 0 ||
                                values.name === '' || values.description === '' || 
                                values.price === '' || values.group === ''?true:false}
                            type='submit' 
                            name='delete'
                        >Delete</button>
                        <button onClick={props.onCloseClick}>Close</button>
                    </div>

                </section>
            </form>
    );
}