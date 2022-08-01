import {SyntheticEvent, useContext, useState} from "react";
import {Context} from "../../context/Contex";
import './newpost.css';
import axios from "axios";
import {ErrorComponent} from "../common/Error";
import {Success} from "../../pages/Contact/Success";

interface Blog {
    username: string | undefined;
    title: string;
    description: string;
    photo?: any;
    category: string;
}

export const NewBlog = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDesc] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [err, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const {user} = useContext(Context);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const newPost: Blog = {
            username: user?.nickname,
            title,
            description,
            category
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("photo", file);
            data.append("title", newPost.title);
            data.append("description", newPost.description);
            data.append("category", newPost.category);

            newPost.photo = filename;
            try {
                await axios.post("http://localhost:3100/blog", data, {
                    withCredentials: true
                });
                setError(false)
                setSuccess(true);
            } catch (err: any) {
                throw new Error(err.message)
            }
        } else {
            setError(true);
        }
    }
    return (
        <div className="write__container">
            <h2>Creat new Blog</h2>
            {err && <ErrorComponent errorText='File is empty. Add image.'/>}
            {success && <Success text='Blog has been created.'/>}
            {file && (
                <img className="writeImg" src={URL.createObjectURL(file)} alt=""/>
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{display: "none"}}
                        onChange={(e: any) => {
                            setFile(e.target.files[0])
                            setError(false)
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <label className='category' htmlFor="category">Category</label>
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option disabled value='Select category'>Select category</option>
                    <option value="cars">cars</option>
                    <option value="lifestyle">lifestyle</option>
                    <option value="healthy">healthy</option>
                    <option value="sport">sport</option>
                    <option value="fitness">fitness</option>
                </select>
                <div className="writeFormGroup">
                    <label className='category'>Description</label>
                  <textarea
                      placeholder="Write here..."
                      className="writeInput writeText"
                      onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    )
};


