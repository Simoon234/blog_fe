import './contact.css';
import {SyntheticEvent, useRef, useState} from "react";
import { useLocation } from "react-router-dom";
import {Success} from "./Success";


export const Contact = () => {
    const [title, setTitle] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');
    const location = useLocation();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3100/contact', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    to: email,
                    subject: title,
                    html: message
                })
            })
            await res.json();

            console.log(res)

            if(res.status === 201) {
                setMessage('')
                setTitle('')
                setEmail('')
                setSuccess('Email has been sent!')

                setTimeout(() => {
                    window.location.replace("http://localhost:3000");
                }, 2500)
            }
        } catch (e: any) {
            throw new Error(e.message);
        }

    }

    return (
        <section className='contact__container'>
            <div className='contact__content'>
                <p>Contact</p>
                {success && <Success text='Email has been sent. You will be redirected to the homepage 👋👋'/>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">
                        Title
                        <input onChange={(e) => setTitle(e.target.value)} type="text" id="title" placeholder="Type title..."/>
                    </label>
                    <label htmlFor="email">
                        Email
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Type email..."/>
                    </label>
                    <label htmlFor="subject">Subject</label>
                    <textarea onChange={(e) => setMessage(e.target.value)} id="subject" name="subject" placeholder="Write something.."/>
                    <button>Send</button>
                </form>
            </div>
        </section>
    )
}