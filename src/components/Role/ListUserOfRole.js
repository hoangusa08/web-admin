import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
export default function UserOfRole() {
    const history = useHistory();
    const [ListUserOfRole , setListUserOfRole] = useState([]);
    const [runuseEff, setrunuseEff] = useState(1)
    useEffect(() => {
        let id = window.location.pathname.split('/')
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        axios.get(`http://localhost:9090/api/v1/role/userRole/${id[id.length-1]}`,token).then((response)=> {
                setListUserOfRole(response.data.content);
                console.log(response.data);
            }).catch((error) =>{
            });
    }, [runuseEff])
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">=
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">UserOfRole</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">UserOfRole</li>
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
                                        <h4 className="card-title">List UserOfRole <button className="btn1 btn" onClick ={e => {history.push("/role")}}>back</button></h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>                                            
                                            <th scope="col">Full Name</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListUserOfRole.map((UserOfRole) => (
                                                <tr>
                                                    <th scope="row">{UserOfRole.id}</th>
                                                    <td>{UserOfRole.fullName}</td>
                                                    <td>{UserOfRole.userName}</td>
                                                    <td>{UserOfRole.phoneNumber}</td>
                                                    <td>{UserOfRole.address}</td>
                                                    
                                                   
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
