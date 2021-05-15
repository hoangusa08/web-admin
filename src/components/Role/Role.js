import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import { useHistory } from 'react-router-dom';
import Api from '../Config/Api';
export default function Role() {
    const [ListRole , setListRole] = useState([]);
    const history = useHistory();
    const check = useContext(LoginContext);
    useEffect(() => {
        let token =  {headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            } 
        }
        function getData() {
            Api.get('role', token).then((response)=> {
                    setListRole(response.data.content);
                }).catch((error) =>{
                });
            }
        getData()
    }, [])

    return (
        <>
        {(check.IsLogin === false ) ? (
            <div className="page-wrapper">
                <h3 style={{textAlign : "center"}}>You need login</h3>
            </div>
        ) : (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Role</h4>
                        </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListRole.map((Role) => (
                                                <tr key={Role.id}>
                                                    <th scope="row">{Role.id}</th>
                                                    <td>{Role.name}</td>
                                                    <td><button className="btn btn-success" onClick ={ e=> {history.push(`/userofrole/${Role.id}`)}}>View</button></td>
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