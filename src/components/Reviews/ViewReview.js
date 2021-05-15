import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import API from '../Config/Api'
import { useHistory } from 'react-router';
import {LoginContext} from '../Context/LoginContext'
function ViewReview(props) {
    const check = useContext(LoginContext);
    const [review, setReview] = useState({
        content : "",
        email: "",
        number_Of_Start: 0,
        name_User: "",
        name_Product: ""
    });
    const history=useHistory();
    const id = props.match.params.id
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    useEffect(() => {
        check.checklogin();

        API.get('review/' + id, token).then((response)=> {
            console.log(response.data)
            setReview(response.data)
        }).catch((error) =>{

        });
    }, []);

          
    return (
        <div className="page-wrapper">
        <div className="page-breadcrumb">
            <div className="row">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">Invoice</h4>
                </div>
                
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <h4 className="card-title">View Invoice</h4>
                        <form className="form-horizontal m-t-30" >
                            <div className="form-group" >
                                <label>Full Name Employee</label>
                                <input type="text" className="form-control" value={review.name_User} readOnly/>
                                    
                            </div>

                            <div className="form-group" >
                                <label>Status</label>
                                <input type="text" className="form-control" value={review.email} disabled/>                                    
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default  ViewReview