import {Context} from "../../context/Contex";
import {SyntheticEvent, useContext, useState} from "react";
import './settings.css';
import {log} from "util";
import {Suc} from "../Register/Success";
import {Success} from "../Contact/Success";
import {Section} from "../../components/common/Section";
import { NewBlog } from "../../components/NewPost/NewBlog";

export interface UserInfo {
    id: string,
    name: string;
  nickname: string;
    email: string;
}

export const Settings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setError] = useState<boolean>(false);
  const {user} = useContext(Context);

  const  handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      if(email.length === 0 || password.length === 0) {
        setError(true);
        throw new Error('error with updating');
      }
      const res = await fetch(`http://localhost:3100/user/${user?.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      await res.json();
      setSuccess(true);
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  return (
      <>
        <div className="settings">
          <div className="settingsWrapper">
            <div className="settingsTitle">
              <span className="settingsUpdateTitle">Update Your Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                  type="email"
                  placeholder='Your email...'
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError(false);
                  }}
              />
              <label>Change password</label>
              <input
                  type="password"
                  placeholder='Your password...'
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(false);
                  }}
              />
              <button className="settingsSubmit" type="submit">
                Update
              </button>
              <p className='settings-info'>If you want to change email or password you have to pass both of this information's. Don't need to change password or email. Just pass the same values as when registering.</p>
            </form>
            {success && <Success text='Update Success'/>}
            {err && <h1>Error</h1>}
          </div>
        </div>
      </>
  )
}