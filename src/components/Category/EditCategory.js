import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import API from '../Config/Api'
import { useHistory } from 'react-router';
import {LoginContext} from '../Context/LoginContext'
function EditCategory(props) {
    const check = useContext(LoginContext);
    const [category, setCategory] = useState({
        id: "",
        category : ""
    });
    const history=useHistory();
    const id = props.match.params.id
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    useEffect(() => {
        check.checklogin();
        API.get('category/' + id, token).then((response)=> {
            setCategory(response.data);
        }).catch((error) =>{
        });
    }, []);

    // console.log(category);

    const editCaegory =  (e) =>{
        e.preventDefault();  
        const data = {
            "name": category.name
        }

        API.patch('category/' + id, data, token).then((response) => {
            console.log(response.data)
            history.push('/categorys')  
            
        }).catch((error) => {

        });
        console.log(category);
    }

    const onChange = (e) => {  
        e.persist();  
        setCategory({...category, [e.target.name]: e.target.value});  
    }  
                
    return (
        <div className="page-wrapper">
        <div className="page-breadcrumb">
            <div className="row">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">Edit Category</h4>
                </div>
                <div className="col-7 align-self-center">
                    <div className="d-flex align-items-center justify-content-end">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">New Category</li>
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
                        <h4 className="card-title">Edit</h4>
                        <form className="form-horizontal m-t-30" onSubmit={editCaegory}>
                            <div className="form-group" >
                                <label>Name Category</label>
                                <input type="text" className="form-control" 
                                    onChange={e => setCategory({...category, name : e.target.value})} value={category.name}/>
                                    
                            </div>
                            <div className="form-group">
                                <button type="submit" name="example-email" className="btn btn-success" >Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default  EditCategory