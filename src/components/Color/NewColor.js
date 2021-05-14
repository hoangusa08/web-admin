import axios from 'axios';
import React, { useState } from 'react'
import Api from '../Config/Api';

export default function NewColor() {
    const [message , setmessage] = useState("");
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
                alert(response.data.message);
            }).catch((error) =>{
                alert(error.message);
                console.log(error)
            });
        }
    }
    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-5 align-self-center">
                        <h4 className="page-title">New Color</h4>
                    </div>
                    <div className="col-7 align-self-center">
                        <div className="d-flex align-items-center justify-content-end">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">New Color</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
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
                                <div className="form-group">
                                    <button type="button" name="example-email" className="btn" onClick={saveColor}>Save </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
