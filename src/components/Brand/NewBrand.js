import Api from '../Config/Api';
import React, { useContext, useState } from 'react'
import {LoginContext} from '../Context/LoginContext'

export default function NewBrand() {
    const [message , setmessage] = useState("");
    const [newvalue, setnewvalue] = useState({
        name : ""
    });
    const check = useContext(LoginContext);
    const savebrand =  (e) =>{
        if( newvalue.name === "" ) {
            setmessage("You have not entered enough");
        }else {
            console.log(newvalue)
            Api.post("brand",newvalue,{
                headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                        } 
                }).then((response)=> {
                alert(response.data.message);
            }).catch((error) =>{
                alert(error.response.data.message);
                console.log(error.response.data)
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
                    <h4 className="page-title">New Brand</h4>
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
                                { (message !=="") ? (<p>{message}</p>):(<></>)}
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
