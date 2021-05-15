import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import API from '../Config/Api';
import {useHistory} from 'react-router-dom'
export default function EditAccount() {
    const check = useContext(LoginContext);
    const history = useHistory()
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
                <h4 className="page-title">My Account</h4>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <button className="btn1 btn btn-info" onClick = { e=> { history.push(`/editaccount/${localStorage.getItem("id")}`)}}  >Edit</button>
                        </div>
                        <div className="table-responsive">
                        <div className="col-md-12">
                            <label>Full Name</label>
                            <input className="form-control" type="text" placeholder="fullName"
                            value={userUpdate.fullName} disabled></input>
                        </div>
                        <br></br>
                        <div className="col-md-12">
                            <label>Phone Number</label>
                            <input className="form-control" type="text" placeholder="Phone Number"
                            value={userUpdate.phoneNumber} disabled></input>
                        </div>
                        <br></br>
                        <div className="col-md-12">
                            <label>Email</label>
                            <input className="form-control" type="text" placeholder="Email"
                           value={userUpdate.email}disabled></input>
                        </div>
                        <br></br>
                        <div className="col-md-12">
                            <label>Address</label>
                            <input className="form-control" type="text" placeholder="Address"
                           value={userUpdate.address} disabled></input>
                        </div>
                        <br></br>
                        <div className="col-md-12">
                            <label>User Name</label>
                            <input className="form-control" type="text" placeholder="UserName"
                            disabled value={userUpdate.username}></input>
                        </div>
                        <br></br>
                       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )}
    </>
    )
}
