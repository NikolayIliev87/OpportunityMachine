import styles from './YourProfile.module.css'

import { validator } from '../../services/validator';

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileContext } from "../../contexts/ProfileContext";
import * as profileService from '../../services/profile_service';
import * as authService from '../../services/auth_service'
import { useNavigate } from 'react-router-dom'

export const YourProfile = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    // const {yourprofile, setYourProfile} = useContext(ProfileContext);

    const [yourprofile, setYourProfile] = useState([]);

    useEffect(() => {if(auth.id) {
        profileService.getProfileDetails(auth.id)
            .then(profile => setYourProfile(profile))}
    },[auth.id]);
    

    const anonymusProfilePicture = "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png"

    const [cityOffices, setCityOffices] = useState([]);
    useEffect(() => {
      authService.getAllCityOffices()
          .then(cityOffices => {setCityOffices(cityOffices)})
    },[]);

    const [managers, setManagers] = useState([]);
    useEffect(() => {
      authService.getAllManagers()
          .then(result => {
            setManagers(result.filter(m => m.user != yourprofile.user))
          })
    },[yourprofile]);

    const [filteredManagers, setFilteredManagers] = useState([])
    useEffect(() => {
        authService.getAllManagers()
            .then(result => {
                setFilteredManagers(result.filter(m => m.city_office == yourprofile.city_office.id &&
                    m.user != yourprofile.user))
            })
      },[yourprofile]);;

      const [filteredRoletypes, setFilteredRoletypes] = useState([]);
      useEffect(() => {
        authService.getAllRoleTypes()
            .then(roletypes => {
                setFilteredRoletypes(roletypes.filter(m => 
                    m.name.toLowerCase().includes('manager')===yourprofile.is_manager))
            })
      },[yourprofile]);

      const [roletypes, setRoleTypes] = useState([]);
      useEffect(() => {
        authService.getAllRoleTypes()
            .then(roletypes => {
              setRoleTypes(roletypes)
            })
      },[]);

    //   const [role_type_name, setRoleTypeName] = useState(yourprofile.role_type.name);
      const [role_type_name, setRoleTypeName] = useState(yourprofile.role_type?yourprofile.role_type.name:'');

    
      const [editableProfile, setEditableProfile] = useState(false)

    const onEditHandler = () => {
        setEditableProfile(true)
    }

    const onCancelHandler = () => {
        setEditableProfile(false)
        profileService.getProfileDetails(auth.id)
            .then(profile => setYourProfile(profile))
    }

    const [values, setValues] = useState({})
    useEffect(() => {
        setValues(
            {
                first_name: `${yourprofile.first_name}`,
                last_name: `${yourprofile.last_name}`,
                phone: `${yourprofile.phone}`,
                photo_url: `${yourprofile.photo_url===null?'':yourprofile.photo_url}`,
                // city_office: `${yourprofile.city_office.id}`,
                city_office: `${yourprofile.city_office?yourprofile.city_office.id:''}`,
                manager: `${yourprofile.manager===null?'':yourprofile.manager}`,
                is_manager: `${yourprofile.is_manager}`,
                // role_type: `${yourprofile.role_type.id}`,
                role_type: `${yourprofile.role_type?yourprofile.role_type.id:''}`,
                role_description: `${yourprofile.role_description}`,
                // managing_city_offices: yourprofile.managing_city_offices.map(function (item) {
                //     return item['id']
                    
                // }),
                managing_city_offices: yourprofile.managing_city_offices
                    ?
                    yourprofile.managing_city_offices.map(function (item) {
                        return item['id']})
                    :
                    ''
                ,
                user: `${auth.id}`,
            }
        )
    },[yourprofile])

    const changeHandler = (ev) => {
        if (ev.target.id === 'city_office') {
            setValues(state => ({
                ...state,
                [ev.target.id]: ev.target.value
            })
            )

            const filteredManagersCityOffice= managers.filter(x => x.city_office == Number(ev.target.value))
        
            if (filteredManagersCityOffice.length != 0) {
            setFilteredManagers(filteredManagersCityOffice)
            }

            const filteredByManagedCountry = []

            if (filteredManagersCityOffice.length != 0) {
            for ( const m of managers) {
                if (
                m.managing_city_offices.includes(Number(ev.target.value)) && 
                m.city_office != Number(ev.target.value)
                ) {
                filteredByManagedCountry.push(m)
                }
            }
            setFilteredManagers(state => [...state, ...filteredByManagedCountry])
            }

            else {
            const onlyFilteredByManagedCountry = []
            for ( const m of managers) {
                if (
                m.managing_city_offices.includes(Number(ev.target.value))
                ) {
                    onlyFilteredByManagedCountry.push(m)
                }
            }
            setFilteredManagers(state => [...state, ...onlyFilteredByManagedCountry])
            }
        }

        else if (ev.target.id === 'is_manager') {
            setValues(state => 
                ({
                ...state,
                [ev.target.id]: !state.is_manager
            })
            )

            if (values.is_manager) {
                setFilteredRoletypes(roletypes.filter(m =>
                                        m.name.toLowerCase().includes('manager')!==true)
                                    )
            }
            else {
                setFilteredRoletypes(roletypes.filter(m =>
                    m.name.toLowerCase().includes('manager')===true)
                )

                values.managing_city_offices = []
            }
        }

        else if (ev.target.id === 'role_type') {
            const role_name = roletypes.filter(x => x.id == Number(ev.target.value))

            setRoleTypeName(role_name[0].name)

            if (role_type_name === "Team Manager") {
                values.managing_city_offices = []
            }

            setValues(state => ({
                ...state,
                [ev.target.id]: ev.target.value
            })
            )
        }

        else if (ev.target.id === 'managing_city_offices') {
            if (ev.target.checked) {
                setValues(state => ({
                    ...state, [ev.target.id]: [...state.managing_city_offices, Number(ev.target.value)],
                }))
              }
              else {
                setValues(state => ({
                    ...state,
                    [ev.target.id]: state.managing_city_offices.filter(item => item != ev.target.value)
                })
                )
              }
        }

        else {
            setValues(state => ({
                ...state,
                [ev.target.id]: ev.target.value
            })
            )
        }
    };

    const onSubmitHandler = (ev) => {
        ev.preventDefault();

        const {...profileData} = values;
        profileService.updateProfile(profileData)
        setYourProfile(profileData)
        setEditableProfile(false)
        navigate('/')
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
        <>
            {!editableProfile
                ?
                <div className={styles.YourProfileView}>
                    <h1>Your Profile</h1>
                    <article>
                        <div>
                            <img src={
                                yourprofile.photo_url===null || yourprofile.photo_url===""
                                ?
                                anonymusProfilePicture
                                :
                                yourprofile.photo_url} 
                                alt='profilePicture'/>
                            <p></p>
                        </div>
                        <div>
                            <h2><p>First Name:</p><span>{yourprofile.first_name}</span></h2>
                            <h2><p>Last Name:</p><span>{yourprofile.last_name}</span></h2>
                            <h2><p>Phone:</p><span>{yourprofile.phone}</span></h2>
                            <h2><p>Username:</p><span>{yourprofile.user_email}</span></h2>
                            <h2><p>Office City:</p><span>{yourprofile.city_office?yourprofile.city_office.name:''}</span></h2>
                            <h2><p>Manager:</p><span>{yourprofile.manager===null?'':yourprofile.manager}</span></h2>
                            <h2><p>Are you manager?:</p><span>{yourprofile.is_manager}</span></h2>
                            <h2><p>Role Type:</p><span>{yourprofile.role_type?yourprofile.role_type.name:''}</span></h2>
                            <h2><p>Role Description:</p><span>{yourprofile.role_description}</span></h2>
                            <h2><p>Managing office cities:
                                {yourprofile.managing_city_offices
                                    ?
                                    yourprofile.managing_city_offices.map(office => 
                                    <span key={office.id}>{office.name}</span>)
                                    :''
                                }
                                </p>
                            </h2>
                            <button onClick={onEditHandler}>Edit</button>
                        </div>
                    </article>
                </div>
                :
                <section className={styles.ProfileEditForm}>
                    <form onSubmit={onSubmitHandler}>
                        <h2>Profile Update Form</h2>
                        <div>
                            <label htmlFor="first_name"  value={values.first_name} >First Name:</label>
                            <input 
                                id='first_name' 
                                type="text"  
                                onChange={changeHandler} 
                                defaultValue={yourprofile.first_name}
                                onBlur={validateInputs}
                            />
                            {errors.first_name && <p>{errors.first_name}</p>}
                        </div>
                        <div>
                            <label htmlFor="last_name"  value={values.last_name} >Last Name:</label>
                            <input 
                                id='last_name' 
                                type="text"  
                                onChange={changeHandler} 
                                defaultValue={yourprofile.last_name}
                                onBlur={validateInputs}
                            />
                            {errors.last_name && <p>{errors.last_name}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone"  value={values.phone} >Phone:</label>
                            <input 
                                id='phone' 
                                type="text"  
                                onChange={changeHandler} 
                                defaultValue={yourprofile.phone}
                                onBlur={validateInputs}
                            />
                            {errors.phone && <p>{errors.phone}</p>}
                        </div>
                        <div>
                            <label htmlFor="photo_url"  value={values.photo_url} >Photo URL:</label>
                            <input 
                                id='photo_url' 
                                type="text"  
                                onChange={changeHandler} 
                                defaultValue={yourprofile.photo_url}
                                onBlur={validateInputs}
                            />
                            {errors.photo_url && <p>{errors.photo_url}</p>}
                        </div>
                        <div>
                            <label htmlFor="city_office">City Office:</label>
                            <select 
                                id='city_office' 
                                value={values.city_office} 
                                onChange={changeHandler} 
                                onBlur={validateInputs}
                            > 
                                <>
                                    {cityOffices.map(office => 
                                        <option value={office.id} key={office.id}>
                                            {office.name}
                                        </option>
                                    )}
                                </>
                            </select>
                            {errors.city_office && <p>{errors.city_office}</p>}
                        </div>
                        <div>
                            <label htmlFor="manager">Manager:</label>
                            <select 
                                id='manager' 
                                value={values.manager} 
                                onChange={changeHandler}
                            > 
                                <>
                                <option value=""></option>
                                {filteredManagers.map(manager =>
                                        <option value={manager.user_email} key={manager.user}>
                                            {manager.user_email} - {manager.role_description}
                                        </option>
                                )}
                                </>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="is_manager">Are you Manager?:</label>
                            <input 
                            id='is_manager'
                            checked={values.is_manager?true:false}
                            type="checkbox" 
                            onChange={changeHandler} 
                            />
                        </div>
                        <div>
                            <label htmlFor="role_type">Role Type:</label>
                            <select 
                                id='role_type' 
                                value={values.role_type} 
                                onChange={changeHandler} 
                                onBlur={validateInputs}> 
                                <>
                                {filteredRoletypes.map(role => 
                                    <option value={role.id} key={role.id} name={role.name}>
                                        {role.name}
                                    </option>
                                )}
                                </>
                            </select>
                            {errors.role_type && <p>{errors.role_type}</p>}
                        </div>
                        <div>
                            <label htmlFor="role_description">Role Description:</label>
                            <input 
                            id='role_description' 
                            type="text" 
                            onChange={changeHandler} 
                            defaultValue={yourprofile.role_description}
                            />
                        </div>
                        {values.is_manager && values.role_type !== '' && role_type_name !== 'Team Manager'
                            ?
                            <div>
                            <label htmlFor="managing_city_offices">Managing Cities:</label>
                            <div>
                                {cityOffices.map(office => 
                                        <div key={office.id}>
                                        <label>{office.name}</label>
                                        <input key={office.id} value={office.id} name={office.name}
                                            id='managing_city_offices' 
                                            type="checkbox" 
                                            checked={values.managing_city_offices.includes(office.id)}
                                            onChange={changeHandler}
                                        />
                                        </div>
                                    )}
                            </div>
                            </div>
                            :
                            <></>
                        }
                                    
                        <div>
                            <label htmlFor="user" value={values.user} >User ID:</label>
                            <input id='user' type="text"  readOnly defaultValue={auth.id}/>
                        </div> 
                        {errors.length > 0 || values.first_name === '' || values.last_name === '' ||
                             values.phone === '' || values.city_office === '' || values.role_type === ''
                            ?
                            <></>
                            :
                            <div>
                                <button type="submit" name='update'>Save Changes</button>
                                <button onClick={onCancelHandler}>Cancle</button>
                            </div>
                            
                        }
                    </form>
                </section>
            }
        </>
    );
}