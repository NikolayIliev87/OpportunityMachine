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
        <div className={styles.CityOfficeNew}>
            <form onSubmit={onSubmitHandler}>
                <h2>Add New City Office</h2>
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
                        <button 
                            type="submit"
                            hidden={Object.keys(errors).length > 0 || values.name === ''?true:false}
                        >Create</button>
                        <button onClick={props.onCloseClick}>Close</button>
                    </div>
                </section>
            </form>
        </div>
    );
}