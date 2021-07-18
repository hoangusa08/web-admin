import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Api from '../Config/Api';
import {LoginContext} from '../Context/LoginContext'
import { storage } from '../FireBase';
import { success } from '../Helper/Notification';

export default function NewImage() {
    const [message , setmessage] = useState("");
    const [newvalue, setnewvalue] = useState({
        name : "",
        link : ""
    });
    const check = useContext(LoginContext);
    var idImage = window.location.pathname.split('/')
    var token = {
        headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
                } 
        }
    const history = useHistory()
    useEffect(() => {
        async function getData() {
            Api.get('image/'+idImage[idImage.length-1],token).then((response)=> {
                let temp = response.data
                setnewvalue({...newvalue , name : temp.name , link : temp.link})
                }).catch((error) =>{
                    console.log(error)
                });
        }
        getData()
    }, [])
    const saveImage =  (e) =>{
        if( newvalue.Image === "" ) {
            setmessage("You have not entered enough");
        }else {
            Api.patch('image/'+idImage[idImage.length-1],newvalue,token).then((response)=> {
                history.push({
                    pathname: '/image', 
                }) 
                success('Edit Successfully Image');
            }).catch((error) =>{
                alert(error.message);
            });
        }
    }
    const handleChange = e => {
        console.log("abc")
        if(e.target.files[0]){
            const uploadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
                uploadTask.on(
                    "state_changed",
                    snapshot => {},
                    error => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(e.target.files[0].name)
                            .getDownloadURL()
                            .then(url =>{
                                setnewvalue({...newvalue , link : url }) 
                            });
                    }
                )
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
                    <h4 className="page-title">Edit Image</h4>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body">
                            <h4 className="card-title">Edit Image</h4>
                            <form className="form-horizontal m-t-30">
                                <div className="form-group">
                                    <label>Name Image </label>
                                    <input type="text" className="form-control" 
                                    onChange={e => setnewvalue({...newvalue ,name : e.target.value})} value={newvalue.name}></input>
                                </div>
                                <div className="form-group">
                                    <label>Link Image </label>
                                    <input type="text" className="form-control" 
                                    value={newvalue.link} disabled></input>
                                </div>
                                <div className="form-group">
                                    <label>File Image </label>
                                    <input type="file" className="form-control" 
                                        onChange={handleChange} ></input>
                                   
                                </div>
                                { (message === "") ? (
                                         <></>
                                    ) : (
                                        <p>{message}</p>
                                    )}
                                <div className="form-group">
                                    <button type="button" name="example-email" className="btn btn-info" onClick={saveImage}>Save </button>
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
