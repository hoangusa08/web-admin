import React, { useContext, useState } from 'react'
import Api from '../Config/Api';
import {LoginContext} from '../Context/LoginContext'
import { success } from '../Helper/Notification';

export default function NewColor() {
    const [message , setmessage] = useState("");
    const check = useContext(LoginContext);
    const [newvalue, setnewvalue] = useState({
        name : "",
    });
    const saveColor =  (e) =>{
        if( newvalue.Color === "" ) {
            setmessage("You have not entered enough");
        }else {
            console.log(newvalue)
            Api.post("color",newvalue,{
                headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                        } 
                }).then((response)=> {
                    success('Successfully added catogory');
            }).catch((error) =>{
                alert(error.message);
                console.log(error)
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
                    <h4 className="page-title">New Color</h4>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body">
                            <h4 className="card-title">New</h4>
                            <form className="form-horizontal m-t-30">
                                <div className="form-group">
                                    <label>Name Color </label>
                                    <input type="text" className="form-control" 
                                    onChange={e => setnewvalue({...newvalue ,name : e.target.value})} value={newvalue.name}></input>
                                </div>
                                { (message !=="") ? (<p>{message}</p>):(<></>)}
                                <div className="form-group">
                                    <button type="button" name="example-email" className="btn btn-info" onClick={saveColor}>Save </button>
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
