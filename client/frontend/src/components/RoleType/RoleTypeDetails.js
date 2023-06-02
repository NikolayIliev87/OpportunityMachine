import styles from './RoleType.module.css'

import { useState, useContext} from "react";
import { validator } from '../../services/validator';

import { AuthContext } from "../../contexts/AuthContext";

export const RoleTypeDetails = (props) => {
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

        const {...roleTypeData} = values;

        if(ev.nativeEvent.submitter.name === 'update') {
            props.onUpdateClick(roleTypeData)
        }
        else if(ev.nativeEvent.submitter.name === 'delete') {
            const roleTypeDataDelete = {...values, is_deleted: values.is_deleted==="false"?true:false}

            props.onUpdateClick(roleTypeDataDelete)
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
            <form className={styles.RoleTypeDetails} onSubmit={onSubmitHandler}>
                <h1>Role Type Details</h1>
                <section>
                    <div>
                        <label htmlFor="name"  value={values.name} >Role Type:</label>
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
                        <label htmlFor="id"  value={values.id} >Role Type ID:</label>
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