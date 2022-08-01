import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import './user.css';
import {BlogInterface} from "../../types";


interface User {
    authorNickName: string;
    details: string;
    name: string;
    gender: string;
}

export const User = () => {
    const {pathname} = useLocation();
    const ph = 'http://localhost:3100/blog/photo/';
    const id = pathname.split('/')[2];
    const [blogs, setBlogs] = useState<BlogInterface[] | null>(null);
    const [user, setUser] = useState<User>({
        details: '',
        authorNickName: '',
        gender: "",
        name: ""
    });

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3100/user/${id}`);
            const data = await res.json();
            setUser(data);
        })()
    }, [id]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3100/blog/user/all/${id}`);
            const data = await res.json();
            setBlogs(data);
        })()

    }, [id])

    return (
        <>
            <section className='user__container'>
                <div className='user__details'>
                    <div className='user__imageBox'>
                        <img src="https://avatars.dicebear.com/api/male/random.svg" alt=""/>
                    </div>
                    <div className='user__info'>
                        <span>Name</span>
                        <h3>{user.name}</h3>
                        <span>Details</span>
                        <h3>{user.details ? user.details : 'Am I the best?'}</h3>
                        <span>Author</span>
                        <h3>{user.authorNickName}</h3>
                        <span>Gender</span>
                        <h3>{user.gender}</h3>
                    </div>
                </div>
            </section>
            <div className='user__blogs'>
                <div className='user__blogs-header'>
                    <h3>Blogs</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam et id necessitatibus sapiente
                        tempora. Architecto at consequuntur cumque facere hic repellat, sint suscipit? Cupiditate dicta
                        dignissimos eligendi error facere, repellat.</p>
                </div>
                <div className='blogs__user'>
                    {blogs?.map((item) => (
                        <div className='blogs__user-detail'>
                            <Link to={`/${item.category}/${item.id}`}><button>Read more</button></Link>
                            <p>{item.title}</p>
                            <span>Title</span>
                            <div className='blogs__user-image'>
                                <img src={ph + item.id} alt=""/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}