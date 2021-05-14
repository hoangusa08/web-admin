import React , {useState , useEffect} from 'react'
import API from '../Config/Api'
import { Link } from 'react-router-dom';
export default function Review() {
    const [ListReview , setListReview] = useState([]);
    useEffect(() => {
        API.get('review').then((response)=> {
                setListReview(response.data.content);
            }).catch((error) =>{
            });
    }, [])
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Review</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Review</li>
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
                                    <h4 className="card-title">List Review </h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Star</th>
                                                <th scope="col">Content</th>                                                
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListReview.map((Review) => (
                                                <tr>
                                                    <th scope="row">{Review.id}</th>
                                                    <td>{Review.number_Of_Star}</td>
                                                    <td>{Review.content}</td>
                                                    <td>{Review.name_User}</td>
                                                    <td>{Review.email}</td>
                                                    <td>{Review.name_Product}</td>
                                                    <td><button className="btn btn-success">View</button> <button className="btn btn-danger">delete</button></td>
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
