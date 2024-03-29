import styles from './ProductGroup.module.css'

import { useState, useContext, useEffect } from "react";
import { validator } from '../../services/validator';

import * as productGroupService from '../../services/productgroup_service'

import { AuthContext } from "../../contexts/AuthContext";

export const ProductGroupDetails = (props) => {
    const {auth} = useContext(AuthContext)
    
    const [errors, setErrors] = useState({});

    // const [productGroups, setProductGroups] = useState([]);
    // useEffect(() => {
    //     productGroupService.getAllProductGroups()
    //         .then(productGroups => {setProductGroups(productGroups)})
    //   },[]);

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

        const {...productGroupData} = values;

        if(ev.nativeEvent.submitter.name === 'update') {
            props.onUpdateClick(productGroupData)
        }
        else if(ev.nativeEvent.submitter.name === 'delete') {
            const productGroupDataDelete = {...values, is_deleted: values.is_deleted==="false"?true:false}

            props.onUpdateClick(productGroupDataDelete)
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
        <div className={styles.ProductGroupData} >
            <form onSubmit={onSubmitHandler}>
                <h2>Category Details</h2>
                <section>
                    <div>
                        <label htmlFor="name"  value={values.name} >Category Name:</label>
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
                        <label htmlFor="id"  value={values.id} >Category ID:</label>
                        <input
                            disabled={true} 
                            id='id' 
                            type="text"  
                            defaultValue={props.id}
                        />
                    </div>
                    <div>
                        <button 
                            hidden={!auth.is_superuser || Object.keys(errors).length > 0 ||
                                values.name === ''?true:false} 
                            type="submit" 
                            name='update'
                        >Save</button>
                        <button 
                            hidden={!auth.is_superuser || Object.keys(errors).length > 0 ||
                                values.name === ''?true:false} 
                            type='submit' 
                            name='delete'
                        >Delete</button>
                        <button onClick={props.onCloseClick}>Close</button>
                    </div>
                </section>
            </form>
        </div>
    );
}