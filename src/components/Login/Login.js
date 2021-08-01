import React, { useContext, useState } from 'react'
import Api from '../Config/Api';
import {LoginContext} from '../Context/LoginContext'
import { CheckChangeContext } from '../Context/CheckChangeContext';
export default function Login() {
    const [userInput , setuserInput] = useState({username:"", password:""});
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const { LoginDispatch} = useContext(LoginContext);
    const checkStatusInvoice = useContext(CheckChangeContext);
    const OnSubmitHandle =  (e) =>{
        if( userInput.username === ""  || userInput.password === "") {
            setErrorMessage("You have not entered username or password")
        }else{
            setIsLoading(true)
            Api.post("auth/login", userInput).then((response)=> {
                setIsLoading(false)
                setErrorMessage(null);
                const {token, info} = response.data;
                if(response.data.info.roleNames[0] === "admin" || response.data.info.roleNames[0] === "employee"){
                    localStorage.setItem("token", token);
                    localStorage.setItem("id", info.id);
                    localStorage.setItem("username", info.username);
                    localStorage.setItem("fullname", info.fullName);
                    localStorage.setItem("roleNames", info.roleNames);
                    checkStatusInvoice.changeStatusInvoice();
                    setErrorMessage("")
                    LoginDispatch();
                }else{
                    setErrorMessage("acount is not exist")
                }
                
            }).catch((error) =>{
                setErrorMessage( "username or password is not correct" );
            });
        }
       
    }
    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.charCode === 13) {
        OnSubmitHandle();
      }
    };
  
    return (
        <div className="login">
            <div className="login-form">
            <h3>Login</h3>
                <div className="row">
                <h3>Username:</h3>
                <input type="text" placeholder="Username" onKeyPress={handleKeypress}
                onChange={e => setuserInput({...userInput ,username : e.target.value})} value={userInput.username}/>
                <br></br>
                </div>
                <div className="row">
                <h3>Password :</h3>
                <input type="password" placeholder="Password" onKeyPress={handleKeypress}
                onChange={e => setuserInput({...userInput ,password : e.target.value})} value={userInput.password}/>
                <br></br>
                </div>
                <input type="button" value={isLoading ? "loading" : "Login"} className="login-button"
                onClick={OnSubmitHandle}/>
                <br></br>        
                {errorMessage && (
                    <div className="error-mesage"><h3>{errorMessage}</h3></div>
                )}
            </div>
        </div>
    )
}
