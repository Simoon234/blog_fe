import "./login.css";
import {Link, useNavigate} from "react-router-dom";
import {SyntheticEvent, useContext, useState} from "react";
import {Context} from "../../context/Contex";
import {Suc} from "../Register/Success";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setError] = useState(false);
    const {dispatch} = useContext(Context);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch({type: 'LOGIN_START'})
        try {
            setLoading(true);
            const res = await fetch('http://localhost:3100/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: "include"
            });


           const data = await res.json();

           if (!data.error) {
                dispatch({
                    type: "LOGIN_SUCCESS", payload: {
                        id: data.id,
                        email: data.email,
                        nickname: data.authorNickName,
                        avatar: data.authorUrl
                    }
                });
                navigate('/', {replace: true})
            } else {
                setError(true);
                setLoading(false);
            }
        } catch (err: any) {
            throw new Error(err)
        }
    };


    return (
        <div className="login">
            {loading && <Suc/>}
            {err &&
                <span style={{color: "red", marginTop: "10px", fontSize: '1.2rem', background: 'white', padding: '1rem', borderRadius: '12px'}}>Something went wrong. Check email and password.</span>}
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="loginInput" type="email"
                       required placeholder="Enter your email..."/>
                <label>Password</label>
                <input value={password} autoComplete={password} onChange={(e) => setPassword(e.target.value)}
                       className="loginInput" type="password" placeholder="Enter your password..."/>
                <Link to='/password/reset' className='passwordReset'>
                    Forget password?
                </Link>
                <button className="loginButton">Login</button>
                <Link to='/signup'>
                    <button className="loginRegisterButton">Register</button>
                </Link>
            </form>
        </div>
    );
}