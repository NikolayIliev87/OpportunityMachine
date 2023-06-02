import styles from './RoleType.module.css'

import { validator } from '../../services/validator';

import { useState } from "react";

export const RoleTypeCreate = (props) => {
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

        const {...roleTypeData} = values;
        props.onCreateClick(roleTypeData)
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
        <form className={styles.RoleTypeNew} onSubmit={onSubmitHandler}>
            <h1>Add New Role Type</h1>
            <section>
                <div>
                    <label htmlFor="name">Role Type Name:</label>
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