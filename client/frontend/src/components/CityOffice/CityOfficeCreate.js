import styles from './CityOffice.module.css'

import { validator } from '../../services/validator';

import { useState } from "react";

export const CityOfficeCreate = (props) => {
    const [errors, setErrors] = useState({});
    const user = JSON.parse(localStorage.getItem('auth'))['id']

    const [values, setValues] = useState({
        name: '',
        is_deleted: false,
        user: user,
    })

    const changeHandler = (ev) => {
        setValues(state => ({
            ...state,
            [ev.target.id]: ev.target.value
        }))
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const {...cityOfficeData} = values;
        props.onCreateClick(cityOfficeData)
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
        <form className={styles.CityOfficeNew} onSubmit={onSubmitHandler}>
            <h1>Add New City Office</h1>
            <section>
                <div>
                    <label htmlFor="name">City Office Name:</label>
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
                    <button type="submit" >Create</button>
                    <button onClick={props.onCloseClick}>Close</button>
                </div>
            </section>
        </form>
    );
}