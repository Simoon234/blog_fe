import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {BlogInterface} from "../../types";
import './single-card.css';

export const CardDetails = () => {
    const {pathname} = useLocation();

    const ph = 'http://localhost:3100/blog/photo/';
    const cat = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    const [blog, setBlog] = useState<BlogInterface>()

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3100/blog/${cat}/${id}`);
            const data = await res.json();
            setBlog(data);
        })()
    }, [cat, id])

    return (
            <>
                <div className='singleCard__wrapper'>
                    <div className='singleCard__image-container'>
                        <img src={ph + blog?.id} alt=""/>
                    </div>
                    <div className='singleCard__details'>
                        <div className='singleCard__details-top'>
                            <h2>{blog?.title}</h2>
                            <span>{blog?.createdAt}</span>
                        </div>

                        <p>{blog?.description}</p>
                    </div>
                </div>
            </>
    )
}
