import styles from './Client.module.css'

import { validator } from '../../services/validator';

import { useState } from "react";

export const ClientCreate = (props) => {
    const [errors, setErrors] = useState({});
    const user = JSON.parse(localStorage.getItem('auth'))['id']

    const [values, setValues] = useState({
        name: '',
        city: '',
        managing_city: '',
        address: '',
        contact: '',
        discount: '',
        phone: '',
        is_deleted: false,
        user: user, 
    })

    const changeHandler = (ev) => {
        setValues(state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
    };

    const onManagingCityChangeHandler = (ev) => {
        setValues (state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const {...clientData} = values;
        props.onCreateClick(clientData)
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

    return (
        <form className={styles.ClientNew} onSubmit={onSubmitHandler}>
            <h1>Add New Client</h1>
            <section>
                <div>
                    <label htmlFor="name">Customer Name:</label>
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
                    <label htmlFor="city">Customer City:</label>
                    <input 
                        id='city' 
                        type="text"  
                        onChange={changeHandler} 
                        value={values.city}
                        onBlur={validateInputs} 
                    />
                    {errors.city && <p>{errors.city}</p>}
                </div>
                <div>
                    <label htmlFor="managing_city">Managing City Office:</label>
                    <select id='managing_city' value={values.managing_city} onChange={onManagingCityChangeHandler}>
                        <>
                        <option value=""></option>
                        {props.allCityOffices.map(cityOffice => 
                            <option value={cityOffice.id} key={cityOffice.id}>
                                {cityOffice.name}
                            </option>
                        )}
                        </>
                    </select>
                </div> 
                <div>
                    <label htmlFor="address">Customer Address:</label>
                    <input 
                        id='address' 
                        type="text" 
                        onChange={changeHandler} 
                        value={values.address}
                        onBlur={validateInputs} 
                    />
                    {errors.address && <p>{errors.address}</p>}
                </div>
                <div>
                    <label htmlFor="contact">Customer Email:</label>
                    <input 
                        id='contact' 
                        type="text" 
                        onChange={changeHandler} 
                        value={values.contact}
                        onBlur={validateInputs} 
                    />
                    {errors.contact && <p>{errors.contact}</p>}
                </div> 
                <div>
                    <label htmlFor="discount">Customer Discount %:</label>
                    <input 
                        id='discount' 
                        type="text" 
                        onChange={changeHandler} 
                        value={values.discount}
                        onBlur={validateInputs} 
                    />
                    {errors.discount && <p>{errors.discount}</p>}
                </div> 
                <div>
                    <label htmlFor="phone">Customer Phone:</label>
                    <input 
                        id='phone' 
                        type="text" 
                        onChange={changeHandler} 
                        value={values.phone}
                        onBlur={validateInputs} 
                    />
                    {errors.phone && <p>{errors.phone}</p>}
                </div> 
                <div>
                    <button type="submit" >Create</button>
                    <button onClick={props.onCloseClick}>Close</button>
                </div>
            </section>
        </form>
    );
}