import React, {  useContext, useState } from 'react'
import Api from '../Config/Api';
import {LoginContext} from '../Context/LoginContext'
import { success } from '../Helper/Notification';
import {storage} from '../FireBase'

export default function NewImage() {
    const [message , setmessage] = useState("");
    const [newvalue, setnewvalue] = useState({
        name : "",
        link : ""
    });
    // const [image , setImage] = useState(null);
    const check = useContext(LoginContext);
    const saveImage =  (e) =>{
        if( newvalue.name === "" || newvalue.link ==="" ) {
            setmessage("You have not entered enough");
        }else {
            console.log(newvalue)
            Api.post("image",newvalue,{
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
    // const handleUpload = useCallback(() =>{
    //     const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //     uploadTask.on(
    //         "state_changed",
    //         snapshot => {},
    //         error => {
    //             console.log(error);
    //         },
    //         () => {
    //             storage
    //                 .ref("images")
    //                 .child(image.name)
    //                 .getDownloadURL()
    //                 .then(url =>{
    //                     console.log(url);
    //                     setImage({...newvalue , link : url })
                        
    //                 });
    //         }
    //     )
    //      setTimeout(console.log(newvalue) , 3000);
    // }, [image])
    const handleChange = e => {
        console.log("abc")
        if(e.target.files[0]){
            // setImage(e.target.files[0]);
            // handleUpload()
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
                    <h4 className="page-title">New Image</h4>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body">
                            <h4 className="card-title">New</h4>
                            <form className="form-horizontal m-t-30">
                                <div className="form-group">
                                    <label>Name Image </label>
                                    <input type="text" className="form-control" 
                                    onChange={e => setnewvalue({...newvalue ,name : e.target.value})} value={newvalue.name}></input>
                                </div>
                                <div className="form-group">
                                    <label>Link Image </label>
                                    <input type="text" className="form-control" 
                                    disabled value={newvalue.link}></input>
                                </div>
                                <div className="form-group">
                                    <label>File Image </label>
                                    <input type="file" className="form-control" 
                                        onChange={handleChange} ></input>
                                   
                                </div>
                                {
                                    message !== "" ? (<p>you need enter value</p>) :( <></>)
                                }
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
