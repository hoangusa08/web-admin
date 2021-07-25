import React , {useState , useEffect} from 'react'
import {useHistory } from 'react-router-dom';
import Api from '../Config/Api';
export default function UserOfRole() {
    const history = useHistory();
    const [ListUserOfRole , setListUserOfRole] = useState([]);
    useEffect(() => {
        let id = window.location.pathname.split('/')
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }

        Api.get(`/role/userRole/${id[id.length-1]}`, token).then((response)=> {
            setListUserOfRole(response.data.content);
            }).catch((error) =>{
        });
        
    }, [])
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">User Of Role</h4>
                        </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">List User Of Role <button className="btn1 btn btn-info" onClick ={e => {history.push("/role")}}>Back</button></h4>
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
                                                <tr key={UserOfRole.id}>
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
