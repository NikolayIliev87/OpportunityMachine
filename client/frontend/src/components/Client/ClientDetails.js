import styles from './Client.module.css'

import { useState, useContext, useEffect } from "react";
import { validator } from '../../services/validator';

import * as clientService from '../../services/client_service'

import { AuthContext } from "../../contexts/AuthContext";

export const ClientDetails = (props) => {
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
        city: `${props.city}`,
        managing_city: `${props.managing_city.id}`,
        address: `${props.address}`,
        contact: `${props.contact}`,
        discount: `${props.discount}`,
        phone: `${props.phone}`,
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

        const {...ticketData} = values;

        if(ev.nativeEvent.submitter.name === 'update') {
            props.onUpdateClick(ticketData)
        }
        else if(ev.nativeEvent.submitter.name === 'delete') {
            const ticketDataDelete = {...values, is_deleted: values.is_deleted==="false"?true:false}

            props.onUpdateClick(ticketDataDelete)
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
          setErrors(state => ({
            ...state,
            [ev.target.id]: validated,
          }))
        }
      }

    return (
            <form className={styles.ClientDetails} onSubmit={onSubmitHandler}>
                <h1>Client Details</h1>
                <section>
                    <div>
                        <label htmlFor="name"  value={values.name} >Customer Name:</label>
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
                        <label htmlFor="city"  value={values.city} >Customer City:</label>
                        <input
                            readOnly={auth.is_superuser?false:true} 
                            id='city' 
                            type="text"  
                            onChange={changeHandler} 
                            defaultValue={props.city}
                            onBlur={validateInputs} 
                        />
                        {errors.city && <p>{errors.city}</p>}
                    </div>
                    <div>
                        <label htmlFor="managing_city">Managing City Office:</label>
                        <select 
                            disabled={auth.is_superuser?false:true} 
                            id='managing_city' 
                            value={values.managing_city} 
                            onChange={changeHandler}
                        >
                            {props.allCityOffices.map(cityOffice => 
                                <option value={cityOffice.id} key={cityOffice.id}>
                                    {cityOffice.name}
                                </option>
                            )}
                        </select>
                    </div> 
                    <div>
                        <label htmlFor="address"  value={values.address} >Customer Address:</label>
                        <input
                            readOnly={auth.is_superuser?false:true} 
                            id='address' 
                            type="text"  
                            onChange={changeHandler} 
                            defaultValue={props.address}
                            onBlur={validateInputs} 
                        />
                        {errors.address && <p>{errors.address}</p>}
                    </div>
                    <div>
                        <label htmlFor="contact"  value={values.contact} >Customer Email:</label>
                        <input
                            readOnly={auth.is_superuser?false:true} 
                            id='contact' 
                            type="text"  
                            onChange={changeHandler} 
                            defaultValue={props.contact}
                            onBlur={validateInputs} 
                        />
                        {errors.contact && <p>{errors.contact}</p>}
                    </div>
                    <div>
                        <label htmlFor="discount"  value={values.discount} >Customer Discount %:</label>
                        <input
                            readOnly={auth.is_superuser?false:true} 
                            id='discount' 
                            type="text"  
                            onChange={changeHandler} 
                            defaultValue={props.discount}
                            onBlur={validateInputs} 
                        />
                        {errors.discount && <p>{errors.discount}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone"  value={values.phone} >Customer Phone:</label>
                        <input
                            readOnly={auth.is_superuser?false:true} 
                            id='phone' 
                            type="text"  
                            onChange={changeHandler} 
                            defaultValue={props.phone}
                            onBlur={validateInputs} 
                        />
                        {errors.phone && <p>{errors.phone}</p>}
                    </div>
                    
                    <div>
                        <button hidden={auth.is_superuser?false:true} type="submit" name='update'>Save</button>
                        <button hidden={auth.is_superuser?false:true} type='submit' name='delete'>Delete</button>
                        <button onClick={props.onCloseClick}>Close</button>
                    </div>

                </section>
            </form>
    );
}