import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
export default function Customer() {
    const history = useHistory();
    const [ListCustomer , setListCustomer] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/admin/user/customer').then((response)=> {
                setListCustomer(response.data.content);
            }).catch((error) =>{
            });
    }, [])
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Customer</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Customer</li>
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
                                        <h4 className="card-title">List Customer <button className="btn1 btn" onClick ={e => {history.push("/newcustomer")}}>new</button></h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>                                            
                                            <th scope="col">Full Name</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListCustomer.map((Customer) => (
                                                <tr >
                                                    <th scope="row">{Customer.id}</th>
                                                    <td>{Customer.fullName}</td>
                                                    <td>{Customer.userName}</td>
                                                    <td>{Customer.email}</td>
                                                    <td>{Customer.phone_Number}</td>
                                                    <td>{Customer.address}</td>
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
