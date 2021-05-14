import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
export default function Category() {
    const history =useHistory()
    const [ListCategory , setListCategory] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/category').then((response)=> {
                setListCategory(response.data.content);
            }).catch((error) =>{
            });
    }, [])
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Category</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Category</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">List Category <button className="btn1 btn"onClick ={e => {history.push("/newcategory")}} >new</button></h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                            {ListCategory.map((Category) => (
                                                <tr>
                                                    <th scope="row">{Category.id}</th>
                                                    <td>{Category.name}</td>
                                                    <td><button className="btn">edit</button></td>
                                                    <td><button className="btn">delete</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
