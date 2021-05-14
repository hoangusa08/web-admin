import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
export default function Role() {
    const [ListRole , setListRole] = useState([]);
    const history = useHistory();
    const [filter, setfilter] = useState(0)
    useEffect(() => {
        
        let token =  {headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            } 
        }
        function getData() {
            axios.get('http://localhost:9090/api/v1/role', token).then((response)=> {
                    setListRole(response.data.content);
                }).catch((error) =>{
                });
            }
        getData()
    }, [filter])

    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Role</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Role</li>
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
                                <div class="table-responsive">
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
                                                <tr>
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
    )
}