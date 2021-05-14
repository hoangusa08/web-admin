import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Api from '../Config/Api';

export default function NewColor() {
    const [message , setmessage] = useState("");
    const [newvalue, setnewvalue] = useState({
        name : "",
    });
    var idColor = window.location.pathname.split('/')
    var token = {headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                } }
    const history = useHistory()
    useEffect(() => {
        async function getData() {
            Api.get('color/'+idColor[idColor.length-1],token).then((response)=> {
                let temp = response.data
                setnewvalue({...newvalue , name : temp.name})
                }).catch((error) =>{
                    console.log(error)
                });
        }
        getData()
    }, [])
    const saveColor =  (e) =>{
        if( newvalue.Color === "" ) {
            setmessage("You have not entered enough");
        }else {
            Api.patch('color/'+idColor[idColor.length-1], newvalue,token).then((response)=> {
                alert(response.data.message);
                history.push('/color')
                }).catch((error) =>{
                    console.log(error)
                });
        }
    }
    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-5 align-self-center">
                        <h4 className="page-title">Edit Color</h4>
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
