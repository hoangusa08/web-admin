import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Api from '../Config/Api';
import {LoginContext} from '../Context/LoginContext'
import { success } from '../Helper/Notification';

export default function NewColor() {
    const [message , setmessage] = useState("");
    const check = useContext(LoginContext);
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
                history.push({
                    pathname: '/color', 
                }) 
                success('Edit  successfully color');
                }).catch((error) =>{
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
                    <h4 className="page-title">Edit Color</h4>
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
                                { (message === "") ? (
                                         <></>
                                    ) : (
                                        <p>{message}</p>
                                    )}
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
