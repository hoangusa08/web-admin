import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import API from '../Config/Api';
export default function EditAccount() {
    const check = useContext(LoginContext);
    const [userUpdate , setuserUpdate] = useState({
        username: "",
        password: "",
        fullName: "",
        address: "",
        email: "",
        phoneNumber: "",
        id_role : 2
    });
    var token ={headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} }
    useEffect(() => {
            async function getdata() {        
                API.get(`user/getOneEmployee/${localStorage.id}`, token ).then((response)=> {
                    let temp = {
                        username : response.data.username,
                        password : "",
                        fullName: response.data.fullName,
                        address :response.data.address ,
                        email: response.data.email,
                        phoneNumber: response.data.phoneNumber ,
                        id_role : 2
                    }
                    setuserUpdate(temp);
                }).catch((error) =>{
                });
            }
            getdata()
    }, [])
    function save() {
        API.patch(`user/${localStorage.id}`, userUpdate , token).then((response)=> {
            alert(response.data.message);
        }).catch((error) =>{
            console.log(error.response.data);
        });      
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
                <h4 className="page-title">Edit Account</h4>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                        <div className="col-md-12">
                            <label>Full Name</label>
                            <input className="form-control" type="text" placeholder="fullName"
                            onChange={e => setuserUpdate({...userUpdate ,fullName : e.target.value})} value={userUpdate.fullName}></input>
                        </div>
                        <div className="col-md-12">
                            <label>Phone Number</label>
                            <input className="form-control" type="text" placeholder="Phone Number"
                            onChange={e => setuserUpdate({...userUpdate ,phoneNumber : e.target.value})} value={userUpdate.phoneNumber}></input>
                        </div>
                        <div className="col-md-12">
                            <label>Email</label>
                            <input className="form-control" type="text" placeholder="Email"
                            onChange={e => setuserUpdate({...userUpdate ,email : e.target.value})} value={userUpdate.email}></input>
                        </div>
                        <div className="col-md-12">
                            <label>Address</label>
                            <input className="form-control" type="text" placeholder="Address"
                            onChange={e => setuserUpdate({...userUpdate ,address : e.target.value})} value={userUpdate.address}></input>
                        </div>
                        <div className="col-md-12">
                            <label>User Name</label>
                            <input className="form-control" type="text" placeholder="UserName"
                            onChange={e => setuserUpdate({...userUpdate ,username : e.target.value})} value={userUpdate.username}></input>
                        </div>
                        <div className="col-md-12">
                            <label>Password</label>
                            <input className="form-control" type="password" placeholder="Password"
                            onChange={e => setuserUpdate({...userUpdate ,password : e.target.value})} value={userUpdate.password}></input>
                        </div>
                        <div className="col-md-12">
                            <br></br>
                            <button className="btn btn-info" onClick={save}>Save</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
    )}
    </>
    )
}
