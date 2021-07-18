import API from '../Config/Api'
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { success } from '../Helper/Notification';
export default function NewCustomer() {
    const history=useHistory();
    const [user , setuser] = useState({
        address: "",
        fullName: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        id_role: 3
    });
    const [message , setmessage] = useState("")
    const [RetypePassword, setRetypePassword] = useState("");
    const register =  (e) =>{
        if( user.fullName === "" || user.phoneNumber === "" || user.password === "" || user.address === "" || user.email === "" || user.username === "" || RetypePassword ==="" ) {
            setmessage("You have not entered enough");
        }else {
            if(RetypePassword !== user.password){
                setmessage(" Retype Password Don't Correct ");
            }
            else {
                let token = {
                    headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
                }
                API.post("user", user , token).then((response)=> {
                    history.push({
                        pathname: '/customer',
                    }) 
                    success('Successfully added new customer');
                }).catch((error) =>{
                });
            }
        }
    }
    return (
        <div className="page-wrapper">
        <div className="page-breadcrumb">
            <div className="row">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">Customer</h4>
                </div>

            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <h4 className="card-title">New Customer</h4>
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" className="form-control"
                                onChange={e => setuser({...user ,fullName : e.target.value})} value={user.fullName}></input>
                            </div>
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" className="form-control"
                                onChange={e => setuser({...user ,username : e.target.value})} value={user.username}></input>
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
    )
}
