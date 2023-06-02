import styles from './CityOffice.module.css'

import { useState, useContext} from "react";
import { validator } from '../../services/validator';

import { AuthContext } from "../../contexts/AuthContext";

export const CityOfficeDetails = (props) => {
    const {auth} = useContext(AuthContext)
    
    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        id: `${props.id}`,
        name: `${props.name}`,
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

        const {...cityOfficeData} = values;

        if(ev.nativeEvent.submitter.name === 'update') {
            props.onUpdateClick(cityOfficeData)
        }
        else if(ev.nativeEvent.submitter.name === 'delete') {
            const cityOfficeDataDelete = {...values, is_deleted: values.is_deleted==="false"?true:false}

            props.onUpdateClick(cityOfficeDataDelete)
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
            <form className={styles.CityOfficeDetails} onSubmit={onSubmitHandler}>
                <h1>City Office Details</h1>
                <section>
                    <div>
                        <label htmlFor="name"  value={values.name} >City Office:</label>
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
                        <label htmlFor="id"  value={values.id} >City Office ID:</label>
                        <input
                            disabled={true} 
                            id='id' 
                            type="text"  
                            defaultValue={props.id}
                        />
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