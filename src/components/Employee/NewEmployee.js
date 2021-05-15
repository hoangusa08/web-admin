import Api from '../Config/Api';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import {LoginContext} from '../Context/LoginContext'

export default function NewEmployee() {
    const history=useHistory();
    const check = useContext(LoginContext);
    const [user , setuser] = useState({
        username: "",
        password: "",
        fullName: "",
        address: "",
        email: "",
        phoneNumber: "",
        id_role : 2,
    });
    const [message , setmessage] = useState("")
    const [RetypePassword, setRetypePassword] = useState("");
    const register =  (e) =>{
        if( user.fullname === "" || user.phone_number === "" || user.password === "" || user.address === "" || user.email === "" || user.username === "" || RetypePassword ==="" ) {
            setmessage("You have not entered enough");
        }else {
            console.log(user)
            if(RetypePassword !== user.password){
                setmessage(" Retype Password Don't Correct ");
            }
            else {
                let token = {
                    headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
                }
                Api.post("admin/user",user ,token).then((response)=> {
                    alert(response.data.message);
                    history.push("/employee")
                }).catch((error) =>{
                    alert(error.response.data.message);
                    console.log(error.response.data);
                });
            }
        }
    }
    return (
        <>
        {(check.IsLogin === false ) ? (
            <div className="page-wrapper">
                <h3 style={{textAlign : "center"}}>you need login</h3>
            </div>
        ) : (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">New Employee</h4>
                </div>
            </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <h4 className="card-title">New</h4>
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" className="form-control"
                                onChange={e => setuser({...user ,fullName : e.target.value})} value={user.fullName}></input>
                            </div>
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" className="form-control"
                                onChange={e => setuser({...user ,username : e.target.value})} value={user.userName}></input>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" 
                                onChange={e => setuser({...user ,email : e.target.value})} value={user.email}/>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" 
                                onChange={e => setuser({...user ,address : e.target.value})} value={user.address}/>
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" className="form-control"
                                onChange={e => setuser({...user ,phoneNumber : e.target.value})} value={user.phoneNumber}></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" 
                                onChange={e => setuser({...user ,password : e.target.value})} value={user.password}></input>
                            </div>
                            <div className="form-group">
                                <label>Retype Password</label>
                                <input type="password" className="form-control" 
                                onChange={e => setRetypePassword(e.target.value)} value={RetypePassword}></input>
                            </div>
                            <div className="form-group">
                                    {message && (
                                        <div className="error-mesage"><h3>{message}</h3></div>
                                    )}
                                <button type="button" name="example-email" className="btn btn-info" onClick={register}>Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
       )}
       </>
    )
}
