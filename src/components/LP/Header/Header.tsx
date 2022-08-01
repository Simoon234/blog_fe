import React, {useContext} from 'react';
import './header.css';
import {Link} from "react-router-dom";
import {Context} from "../../../context/Contex";

export const Header = () => {
    const {user, dispatch} = useContext(Context);

    const handLogout = async () => {
        const res = await fetch('http://localhost:3100/auth/logout', {
            credentials: "include"
        });
        await res.json();
        dispatch({type: 'LOGOUT'})
        window.location.replace('/')
    }
    return (
        <header>
            <h2><Link to='/'>B.l.o.g</Link></h2>
            {user ?
                <>
                    <Link className="link" to="/settings">
                        <img
                            className="topImg"
                            src={`https://avatars.dicebear.com/api/male/random.svg`}
                            alt=""
                        />
                    </Link>
                    <div>
                        <button onClick={handLogout} className='logout'>Logout</button>
                        <button onClick={() => window.location.replace('/write')} className='write'>Write</button>
                    </div>

                </>
                : <>
                    <nav className='links'>
                        <ul>
                            <li>
                                <Link to='/contact'>CONTACT</Link>
                            </li>
                            <li>
                                <Link to='/registration'>SIGN IN</Link>
                            </li>
                            <li>
                                <Link to='/login'>SIGN UP</Link>
                            </li>
                        </ul>
                    </nav>
                </>
            }
        </header>
    )
}