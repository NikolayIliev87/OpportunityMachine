import styles from './Product.module.css'

import { validator } from '../../services/validator';

import { useState } from "react";

export const ProductCreate = (props) => {
    const [errors, setErrors] = useState({});
    const user = JSON.parse(localStorage.getItem('auth'))['id']

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        group: '',
        is_deleted: false,
        user: user, 
    })

    const changeHandler = (ev) => {
        setValues(state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
    };

    const onGroupsChangeHandler = (ev) => {
        setValues (state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const {...productData} = values;
        props.onCreateClick(productData)
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
        //   setErrors(state => ({
        //     ...state,
        //     [ev.target.id]: validated,
        //   }))
        // }
      };

    return (
        <div className={styles.ProductNew}>
            <form onSubmit={onSubmitHandler}>
                <h2>Add New Product</h2>
                <section>
                    <div>
                        <label htmlFor="name">Product Name:</label>
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
                        <label htmlFor="description">Product Description:</label>
                        <textarea 
                            id='description' 
                            onChange={changeHandler} 
                            value={values.description}
                            onBlur={validateInputs} 
                        />
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    <div>
                        <label htmlFor="group">Product Category:</label>
                        <select id='group' value={values.group} onChange={onGroupsChangeHandler}>
                            <>
                            <option value=""></option>
                            {props.allProductGroups.map(group => 
                                <option value={group.id} key={group.id}>
                                    {group.name}
                                </option>
                            )}
                            </>
                        </select>
                    </div> 
                    <div>
                        <label htmlFor="price">Product List Price:</label>
                        <input 
                            id='price' 
                            type="text" 
                            onChange={changeHandler} 
                            value={values.price}
                            onBlur={validateInputs} 
                        />
                        {errors.price && <p>{errors.price}</p>}
                    </div>
                    <div>
                        <button 
                            type="submit"
                            hidden={Object.keys(errors).length > 0 || values.name === '' ||
                            values.description === '' || values.price === '' || values.group === ''
                            ?true:false}
                        >Create</button>
                        <button onClick={props.onCloseClick}>Close</button>
                    </div>
                </section>
            </form>
        </div>
    );
}