import React, { useState } from 'react'
import Api from '../Config/Api'
import { Link, useHistory } from 'react-router-dom'


export default function AddCategory() {

    const history = useHistory();
    const [newValue, setNewValue] = useState({
        category : ""
    });
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    const save =  (e) =>{
        console.log(newValue);
        const data = {
            name: newValue.category
        }

        Api.post('category', data, token)
        .then(response => {
            console.log(response.data)
            history.push('/categorys')
        })
        .catch(errors => {
            console.log(errors)
        })
    }

    return (
        <div className="page-wrapper">
        <div className="page-breadcrumb">

            <div className="col-5 align-self-center">
                <h4 className="page-title">Category</h4>
            </div>

        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <h4 className="card-title">New Category</h4>
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label>Name Category </label>
                                <input type="text" className="form-control" value=""
                                onChange={e => setNewValue({...newValue ,category : e.target.value})} value={newValue.category}/>
                            </div>
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn btn-success" onClick={save}>Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </div>
    )
}
