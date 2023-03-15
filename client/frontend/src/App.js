import styles from './App.module.css'

import {Routes, Route} from 'react-router-dom';

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Navigation/Header";
import { Home } from './components/Home/Home';
import { Login } from './components/Authentication/Login';
import { Register } from './components/Authentication/Register';
import { Logout } from "./components/Authentication/Logout";

import { AuthContext } from './contexts/AuthContext';

import {useLocalStorage} from './hooks/useLocalStorage';

function App() {
  const [auth, setAuth] = useLocalStorage('auth', {});

  const userLogin = (authData) => {
    setAuth(authData)
  };

  return (
    <div className={styles.AppMain}>
      <AuthContext.Provider value={{auth, userLogin}}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>

        <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
