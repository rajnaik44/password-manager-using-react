import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const passwords = localStorage.getItem("password");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text)=>{
    toast('copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      
    navigator.clipboard.writeText(text)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length >3 && form.password.length > 3){
    setPasswordArray([...passwordArray, {...form, id:uuidv4()}]);
    localStorage.setItem("password", JSON.stringify([...passwordArray,{...form, id:uuidv4()}]));
    setForm({ site: "", username: "", password: "" }); // Reset form fields after saving
    toast.info('password saved successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }else{
      toast.info('password not saved');
    }
  };

  const deletePassword = (id) => {
    let c = confirm ("Do you really want to delete this password");
    if(c){
      console.log("Deleting password with id " , id)
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    toast('password has been deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  };

  const editPassword = (id) => {
    console.log("Editing password with id " , id)
    setForm(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
  };



  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition="Bounce"
/>
<ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-200 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="mx-auto p-2 md:p-0  md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="text-white flex flex-col p-4 gap-3 items-center">
          <input
            value={form.site}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full py-1 px-4 text-black"
            type="text"
            onChange={handleChange}
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between ">
            <input
              value={form.username}
              id="username"
              placeholder="Enter UserName"
              type="text"
              onChange={handleChange}
              name="username"
              className="rounded-full border border-green-500 w-full py-1 px-4 text-black"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                id="password"
                placeholder="Enter Password"
                type="password"
                onChange={handleChange}
                name="password"
                className="rounded-full border border-green-500 w-full py-1 px-4 text-black "
              />
              <span
                onClick={showPassword}
                className="absolute right-[4px] top-[2px] text-black cursor-pointer"
              >
                <img
                  ref={ref}
                  className="py-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="bg-green-500 rounded-full flex justify-center items-center px-4 py-2 w-fit hover:bg-green-800"
          >
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}

          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th>Site</th>
                  <th>UserName</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center  flex items-center justify-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div className="size-7 cursor-pointer" onClick={()=>{copyText(item.site)}}>
                          <img
                            className="pt-1 mx-2"
                            width={20}
                            src="icons/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="text-center justify-center">
                      <div className="flex items-center justify-center">
                        <span>{item.username}</span>
                        <div className="size-7 cursor-pointer" onClick={()=>{copyText(item.username)}}>
                          <img
                            className="pt-1 mx-2"
                            width={20}
                            src="icons/copy.png"
                            alt="copy"
                          />
                        </div>
                        </div>
                      </td>
                      <td className="text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.password}</span>
                        <div className="size-7 cursor-pointer" onClick={()=>{copyText(item.password)}} >
                          <img
                            className="pt-1 mx-2"
                            width={20}
                            src="icons/copy.png"
                            alt="copy"
                          />
                        </div>
                        </div>
                      </td>
                      <td className="text-center mx-2">
                    <span onClick={()=>{editPassword(item.id)}} className="font-bold text-xl hover:text-green-950 mx-3 cursor-pointer">Edit</span>
                    <span onClick={()=>{deletePassword(item.id)}} className="font-bold text-xl hover:text-green-950 cursor-pointer">Delete</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
