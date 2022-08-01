import './register.css';
import {Link} from "react-router-dom";
import {SyntheticEvent, useState} from "react";
import {Success} from "../Contact/Success";
import {Suc} from "./Success";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNick] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const registerForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        setError(false)

        if(password.length < 5) {
            setError(true);
        }
        try {
            setLoading(true);
            const res = await fetch('http://localhost:3100/user', {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({
                    name: username,
                    email,
                    authorNickName: nickname,
                    password,
                    gender
                })
            });
            const data = await res.json();
            console.log(data)
            if(data.statusCode !== 400) {
                setTimeout(() => {
                    data && window.location.replace("/login");
                }, 2000)
            }
            if(data.statusCode === 400) {
                setError(true);
                setLoading(false)
            }


        } catch (e: any) {
            setError(true);
            throw new Error(e.message);
        }
    }

    return (
        <div className="register">
            {loading && <Suc/>}
            <span className="registerTitle">Register</span>
            {success && <Success text='Success, you will be redirected to the (login) page.'/>}
            <form className="registerForm" onSubmit={registerForm}>
                <label>Username</label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} className="registerInput"
                       type="text" required placeholder="Enter your username..."/>
                <label>Email</label>
                <input onChange={(e) => {
                    setEmail(e.target.value);
                    setError(false)
                }} value={email} required className="registerInput" type="email"
                       placeholder="Enter your email..."/>
                <label>Password</label>
                <input onChange={(e) => {
                    setPassword(e.target.value)
                    setError(false)
                }} value={password} required className="registerInput"
                       type="password" autoComplete={password} placeholder="Enter your password..."/>
                <label>Nickname</label>
                <input type="text" placeholder='Enter your nickname...' onChange={(e) => setNick(e.target.value)} value={nickname}/>
                <label>Gender</label>
                <select id="gender" onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button className="registerButton">Register</button>
                <Link to='/login'>
                    <button className="loginButton">Login</button>
                </Link>
                {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong. Make sure your password have min. 5 characters. If have, that s mean that email already exist.</span>}
            </form>
        </div>
    )
}