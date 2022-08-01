import './password-reset.css';
import {SyntheticEvent, useState} from "react";

export const PasswordReset = () => {
    const [email, setEmail] = useState<string>('');

    const reset = async (e: SyntheticEvent) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3100/auth/password/reset', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });
        const data = await res.json();
        console.log({data});
    }


    return (
        <section className='password__container'>
            <div className='password__card'>
                <p>Reset password</p>
                <form onSubmit={reset}>
                    <label htmlFor="email"> Email
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id='email'
                               placeholder='Your email address...'/>
                    </label>
                    <button>Send</button>
                </form>
            </div>
        </section>
    )
}