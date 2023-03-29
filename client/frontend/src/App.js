import styles from './App.module.css'

import {Routes, Route} from 'react-router-dom';
import { useState, useEffect } from "react";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Navigation/Header";
import { Home } from './components/Home/Home';
import { Login } from './components/Authentication/Login';
import { Register } from './components/Authentication/Register';
import { Logout } from "./components/Authentication/Logout";
import { ProfilesList } from './components/Profile/ProfilesList';
import { YourProfile } from './components/Profile/YourProfile';

import { AuthContext } from './contexts/AuthContext';
import { ProfileContext } from './contexts/ProfileContext';

import * as profileService from './services/profile_service';

import {useLocalStorage} from './hooks/useLocalStorage';

function App() {
  const [auth, setAuth] = useLocalStorage('auth', {});

  const userLogin = (authData) => {
    setAuth(authData)
  };

  const [yourprofile, setYourProfile] = useState([]);

  useEffect(() => {if(auth.id) {
    profileService.getProfileDetails(auth.id)
          .then(profile => setYourProfile(profile))}
  },[auth.id]);

  return (
    <div className={styles.AppMain}>
      <AuthContext.Provider value={{auth, userLogin}}>
        <ProfileContext.Provider value={{yourprofile, setYourProfile}}>
          <Header />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/profile" element={<YourProfile />}></Route>
            <Route path="/profileslist" element={<ProfilesList />}></Route>
          </Routes>

          <Footer />
        </ProfileContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
