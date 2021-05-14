import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
export default function Employee() {
    const history = useHistory();
    const [ListEmployee , setListEmployee] = useState([]);
    const [runuseEff, setrunuseEff] = useState(1)
    useEffect(() => {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        axios.get('http://localhost:9090/api/v1/admin/user/employee',token).then((response)=> {
                setListEmployee(response.data.content);
                console.log(response.data);
            }).catch((error) =>{
            });
    }, [runuseEff])
    function deleteEmployee (id) {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        axios.delete(`http://localhost:9090/api/v1/admin/user/${id}`,token).then((response)=> {
            alert(response.data.message)
            setrunuseEff(id)
        }).catch((error) =>{
            alert(error.data)
        });
    }
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">=
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Employee</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Employee</li>
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
                                        <h4 className="card-title">List Employee <button className="btn1 btn btn-success" onClick ={e => {history.push("/newemployee")}}>new</button></h4>
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
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListEmployee.map((Employee) => (
                                                <tr>
                                                    <th scope="row">{Employee.id}</th>
                                                    <td>{Employee.fullName}</td>
                                                    <td>{Employee.userName}</td>
                                                    <td>{Employee.phoneNumber}</td>
                                                    <td>{Employee.address}</td>
                                                    <td><button className="btn btn-info" onClick ={ e=> {history.push(`/editemployee/${Employee.id}`)}}>edit</button>
                                                    <button className="btn btn-danger" onClick = {deleteEmployee.bind(this,Employee.id)}>delete</button></td>
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
