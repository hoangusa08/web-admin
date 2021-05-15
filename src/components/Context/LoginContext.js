import React , {createContext , useState} from 'react';
import {useHistory} from 'react-router-dom'
export const LoginContext = createContext();

const LoginContextProvider =({children}) =>{
    const [Id , setId] = useState("");
    const [Username , setUsername] = useState("");
    const [Fullname , setfullname] = useState("");
    const [employer , setemployer] = useState("");
    const [isLogin , setisLogin] = useState(false);
    const history = useHistory();
    // function dispatch
    const LoginDispatch = () =>{
        setId(localStorage.getItem('id'));
        setUsername(localStorage.getItem('username'));
        setfullname(localStorage.getItem('fullname'));
        setemployer(localStorage.getItem("employer"));
        setisLogin(true);
        if(localStorage.getItem("roleNames") === "admin"){
             history.push("/sale")
        } else {
            history.push("/products")
        }
    }
    const checklogin = () =>{
        setId(localStorage.getItem('id'));
        setUsername(localStorage.getItem('username'));
        setfullname(localStorage.getItem('fullname'));
        setemployer(localStorage.getItem("roleNames"));
        if(localStorage.getItem("token") === null){
            setisLogin(false);
        }else{
            setisLogin(true);
        }
    }
    const LogoutDispatch = () =>{
        setId("");
        setUsername("");
        setfullname("");
        setemployer("");
        setisLogin(false);
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('fullname');
        localStorage.removeItem('token');
        localStorage.removeItem('roleNames');
        localStorage.removeItem('user');
        history.push("/login");
    }
    //context data
    const LoginContextData = {
        Id : Id,
        Username :Username , 
        Fullname :Fullname , 
        IsLogin :  isLogin ,
        Employer : employer,
        checklogin,
        LoginDispatch,
        LogoutDispatch,
    }
    
    //return provider

    return(
        <LoginContext.Provider value={LoginContextData}>
            {children}
        </LoginContext.Provider>
    )

}
export default LoginContextProvider;
