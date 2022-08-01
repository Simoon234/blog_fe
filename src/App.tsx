import React, {useContext} from 'react';
import './App.css';
import {Route, Routes, } from "react-router-dom";
import {Header} from "./components/LP/Header/Header";
import {HomePage} from "./layout/HomePage";
import {CardDetails} from "./pages/SingleCard/CardDetails";
import {Contact} from "./pages/Contact/Contact";
import {Register} from "./pages/Register/Register";
import {Login} from "./pages/Login/Login";
import {Settings} from "./pages/Settings/Settings";
import {Context, ContextProvider} from "./context/Contex";
import {User} from "./pages/User/User";
import {NewBlog} from "./components/NewPost/NewBlog";
import {PasswordReset} from "./pages/ResetPassword/PasswordReset";

function App() {
    const {user} = useContext(Context);
  return (
    <>
        <ContextProvider>
            <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/:lifestyle/:id' element={<CardDetails/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/registration' element={user ? <HomePage/> : <Register/>}/>
                <Route path='/login' element={user ? <HomePage/> : <Login/>}/>
                <Route path='/settings' element={user ? <Settings/> : <HomePage/>}/>
                <Route path='/author/:user' element={<User/>}/>
                <Route path='/write' element={user ? <NewBlog/> : <Login/>}/>
                <Route path='/password/reset' element={<PasswordReset/>}/>
            </Routes>
        </ContextProvider>
    </>
  );
}

export default App;
