import {Section} from "../common/Section";
import './blog.css';
import React from 'react';

//@ts-ignore
import img from '../../images/test.jpg';


import {useEffect, useMemo, useState} from "react";
import {BlogInterface} from "../../types";
import {Link} from "react-router-dom";

export const Blog = () => {
    const [blogs, setBlogs] = useState<BlogInterface[]>([]);
    const [cat, setCategory] = useState('');

    const ph = 'http://localhost:3100/blog/photo/';

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3100/blog`);
            const data = await res.json();
            setBlogs(data);
        })();

    }, [cat])

    const handleClick = (e: any) => {
        setCategory(e.target.innerHTML);
    }


    const filterElements = () => {
        if(cat === 'All') {
            return blogs;
        }
        return blogs.filter(item => item.category.includes(cat));
    }

    const filteredList = useMemo(filterElements, [cat, blogs]);
    const categorySet = new Set(blogs.map((item) => item.category));
    const categories = Array.from(categorySet).sort();

    return (
        <Section>
            <div className='blog__header'>
                <h2>Blogs</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda cupiditate, deleniti eveniet
                    in laborum magnam odio optio placeat voluptate!</p>
            </div>
            <div className='category'>
                <button onClick={(e: any) => setCategory(e.target.innerHTML)}>All</button>
                {new Set(categories.map((item, i) => (
                    <div key={i}>
                        <button onClick={handleClick}>{item}</button>
                    </div>
                )))}
            </div>
            <div className='blogs__content'>
                {filteredList && filteredList
                    .map((item) =>
                    <div key={item.id} className='blogs__card'>
                        <div className='blogs__card-ImageHeader'>
                            <Link to={`${item.category}/${item.id}`}>
                                <img src={ph + item.id} alt=""/>
                            </Link>
                        </div>
                        <div className='blogs__card-info'>
                            <Link to={`/author/${item.user.id}`}>
                                <p>{item.user.authorNickName}</p>
                            </Link>
                            <div className='blogs__card-info-right'>
                                <span>{item.createdAt.split(',')[0]}</span>
                                <span>{item.category}</span>
                            </div>
                        </div>
                        <p className='blogs__card-tittle'>{item.title}</p>
                        <p className='blogs__card-description'>{item.description.length > 200 ? item.description.slice(0, 122) : item.description}...</p>
                    </div>
                )}
            </div>

        </Section>
    )
}