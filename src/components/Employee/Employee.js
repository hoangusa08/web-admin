import React , {useState , useEffect, useContext} from 'react'
import Api from '../Config/Api'
import {useHistory } from 'react-router-dom';
import {LoginContext} from '../Context/LoginContext'
export default function Employee() {
    const history = useHistory();
    const check = useContext(LoginContext);
    const [ListEmployee , setListEmployee] = useState([]);
    const [runuseEff, setrunuseEff] = useState(1)
    useEffect(() => {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        Api.get('admin/user/employee',token).then((response)=> {
                setListEmployee(response.data.content);
                console.log(response.data.content);
            }).catch((error) =>{
            });
    }, [runuseEff])
    function deleteEmployee (id) {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        Api.delete(`admin/user/${id}`,token).then((response)=> {
            alert(response.data.message)
            setrunuseEff(id)
        }).catch((error) =>{
            alert(error.data)
        });
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
                        <h4 className="page-title">Employee</h4>
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
                                            <th scope="col">Email</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListEmployee.map((Employee) => (
                                                <tr key={Employee.id}>
                                                    <th scope="row">{Employee.id}</th>
                                                    <td>{Employee.fullName}</td>
                                                    <td>{Employee.userName}</td>
                                                    <td>{Employee.phoneNumber}</td>
                                                    <td>{Employee.email}</td>
                                                    <td>{Employee.address}</td>
                                                    <td><button className="btn btn-info" onClick ={ e=> {history.push(`/editemployee/${Employee.id}`)}}>edit</button> <button
                                                     className="btn btn-danger" onClick = {deleteEmployee.bind(this,Employee.id)}>delete</button></td>
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
        )}
        </>
    )
}
