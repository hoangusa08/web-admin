import React, { useContext, useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import Api from '../Config/Api';
import {LoginContext} from '../Context/LoginContext'
export default function EditBrand() {
        const check = useContext(LoginContext);
        const [message , setmessage] = useState("");
        const [newvalue, setnewvalue] = useState({
            name : ""
        });
        const history = useHistory()
        const token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        var id = window.location.pathname.split('/')
        useEffect(() => {
            check.checklogin();
            Api.get('brand/' + id[id.length-1], token).then((response)=> {
                setnewvalue(response.data);
            }).catch((error) =>{
            });
        }, []);
        const savebrand =  (e) =>{
            let token = {
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
            }
            let id = window.location.pathname.split('/')
            if( newvalue.name === "" ) {
                setmessage("You have not entered enough");
            }else {
                    Api.patch(`brand/${id[id.length-1]}`, newvalue , token).then((response)=> {
                        alert(response.data.message);
                        history.push('/brands')
                    }).catch((error) =>{
                        alert(error.response.data.message);
                        console.log(error.response)
                    });
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
                        <h4 className="page-title">Edit Brand</h4>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-body">
                                <h4 className="card-title">New</h4>
                                <form className="form-horizontal m-t-30">
                                    <div className="form-group">
                                        <label>Name Brand <span className="help"> e.g. "Gucci"</span></label>
                                        <input type="text" className="form-control" 
                                        onChange={e => setnewvalue({...newvalue ,name : e.target.value})} value={newvalue.name}></input>
                                    </div>
                                    { (message === "") ? (
                                         <></>
                                    ) : (
                                        <p>{message}</p>
                                    )}
                                    <div className="form-group">
                                        <button type="button" name="example-email" className="btn btn-info" onClick={savebrand}>Save </button>
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
