import styles from './Authentication.module.css'

import { validator } from '../../services/validator';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../../services/auth_service'

export const Register = () => {
    const [cityOffices, setCityOffices] = useState([]);
    useEffect(() => {
      authService.getAllCityOffices()
          .then(cityOffices => {setCityOffices(cityOffices)})
    },[]);

    const [filteredRoletypes, setFilteredRoletypes] = useState([]);

    const [roletypes, setRoleTypes] = useState([]);
    useEffect(() => {
      authService.getAllRoleTypes()
          .then(roletypes => {
            setRoleTypes(roletypes)
            // as is_manager default is false roles list is set to show non manager ones by default
            setFilteredRoletypes(roletypes.filter(m => m.name.toLowerCase().includes('manager')!==true))
          })
    },[]);

    const [filteredManagers, setFilteredManagers] = useState([]);

    const [managers, setManagers] = useState([]);
    useEffect(() => {
      authService.getAllManagers()
          .then(result => {
            setManagers(result)
          })
    },[]);

    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [photourl, setPhotourl] = useState('');
    const [city_office, setCityOffice] = useState('');
    const [manager, setManager] = useState('');
    const [is_manager, setIsManager] = useState(false);
    const [role_type, setRoleType] = useState('');
    const [role_type_name, setRoleTypeName] = useState('');
    const [role_description, setRoleDescription] = useState('');
    const [managing_city_offices, setManagingCityOffices] = useState([]);
    const navigate = useNavigate();

    const registerHandler = (ev) => {
        ev.preventDefault()
        const profile = {
            "first_name": firstname,
            "last_name": lastname,
            "phone": phone,
            "photo_url": photourl,
            "city_office": city_office,
            "manager": manager,
            "is_manager": is_manager,
            "role_type": role_type,
            "role_description": role_description,
            "managing_city_offices": managing_city_offices,
        }
        
        const registerData = {
          'email': username,
          "password": password,
          profile
        }
        
        authService.register(registerData)
          .then(result => {
            // userLogin(result);
            navigate('/');
          })
          .catch(() => {navigate('/register');
        })
    };

    const usernameChangeHandler = (ev) => {
        setUsername(ev.target.value)
    };

    const passwordChangeHandler = (ev) => {
        setPassword(ev.target.value)
    };

    const firstNameChangeHandler = (ev) => {
        setFirstname(ev.target.value)
    };

    const lastNameChangeHandler = (ev) => {
        setLastname(ev.target.value)
    };

    const phoneChangeHandler = (ev) => {
        setPhone(ev.target.value)
    };

    const photoUrlChangeHandler = (ev) => {
        setPhotourl(ev.target.value)
    };

    const cityOfficeChangeHandler = (ev) => {
        setCityOffice(ev.target.value)
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
    };

    const managerChangeHandler = (ev) => {
        setManager(ev.target.value)
    };

    const isManagerChangeHandler = (ev) => {
        setIsManager(state => !state)
        if (is_manager!==true) {
          setFilteredRoletypes(roletypes.filter(m => m.name.toLowerCase().includes('manager')===true))
        }
        else {
          setFilteredRoletypes(roletypes.filter(m => m.name.toLowerCase().includes('manager')!==true))
        }
    };

    const roleTypeChangeHandler = (ev) => {
        setRoleType(ev.target.value)
        if (ev.target.value !== '') {
          const role_name = roletypes.filter(x => x.id == Number(ev.target.value))

          setRoleTypeName(role_name[0].name)
        }
    };

    const roleDescriptionChangeHandler = (ev) => {
        setRoleDescription(ev.target.value)
    };

    const managingCityOfficesChangeHandler = (ev) => {
      if (ev.target.checked) {
        setManagingCityOffices(state => [...state, ev.target.value])
      }
      else {
        setManagingCityOffices(state => state.filter(item => item !== ev.target.value))
      }

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
    } 

    return (
        <section className={styles.Authentication}>
          <form onSubmit={registerHandler}>
          <h2>Register Form</h2>
          <div>
            <label htmlFor="username" >Email:</label>
            <input 
              id='username' 
              type="text" 
              onChange={usernameChangeHandler} 
              value={username} 
              onBlur={validateInputs} 
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input 
              id='password' 
              type="password" 
              onChange={passwordChangeHandler} 
              value={password}
              onBlur={validateInputs} 
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input 
              id='first_name' 
              type="text" 
              onChange={firstNameChangeHandler} 
              value={firstname}
              onBlur={validateInputs} 
            />
            {errors.first_name && <p>{errors.first_name}</p>}
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input 
              id='last_name' 
              type="text" 
              onChange={lastNameChangeHandler} 
              value={lastname}
              onBlur={validateInputs}  
            />
            {errors.last_name && <p>{errors.last_name}</p>}
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input 
              id='phone' 
              type="text" 
              onChange={phoneChangeHandler} 
              value={phone}
              onBlur={validateInputs} 
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="photo_url">Photo URL:</label>
            <input 
              id='photo_url' 
              type="text" 
              onChange={photoUrlChangeHandler} 
              value={photourl}
            />
          </div>
          <div>
            <label htmlFor="city_office">City Office:</label>
            <select id='city_office' value={city_office} onChange={cityOfficeChangeHandler} onBlur={validateInputs}> 
                  <>
                    <option value=""></option>
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
            <select id='manager' value={manager} onChange={managerChangeHandler}> 
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
              type="checkbox" 
              onChange={isManagerChangeHandler} 
            />
          </div>
          <div>
            <label htmlFor="role_type">Role Type:</label>
            <select id='role_type' value={role_type} onChange={roleTypeChangeHandler} onBlur={validateInputs}> 
                <>
                  <option value=""></option>
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
              onChange={roleDescriptionChangeHandler} 
              value={role_description}
            />
          </div>
          {is_manager && role_type !== '' && role_type_name !== 'Team Manager'
            ?
            <div>
              <label htmlFor="managing_city_offices">Managing Cities:</label>
              <div>
                {cityOffices.map(office => 
                        <div key={office.id}>
                          <label>{office.name}</label>
                          <input key={office.id} value={office.id} name={office.name}
                            type="checkbox" 
                            onChange={managingCityOfficesChangeHandler}
                          />
                        </div>
                      )}
              </div>
            </div>
            :
            <></>
          }
          {errors.length > 0 || username === '' || password === '' || firstname === '' ||
           lastname === '' || phone === '' || city_office === '' || role_type === ''
          ?
            <></>
          :
            <button type="submit" >Register</button>
          }

        </form>
      </section>
    )
}