import React , {useState , useEffect} from 'react'
import API from '../Config/Api'
import Pagination from '../Pagination/index'
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
export default function Customer() {
    const location = useLocation();
    const history = useHistory();
    const [ListCustomer , setListCustomer] = useState([]);
    const [runuseEff, setrunuseEff] = useState(1)
    const [alert, setAlert] = useState({
        report: ""
    })
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })

    useEffect(() => {
        if(typeof location.state != "undefined")
            setAlert({...alert, report : location.state.report})
     }, [location]);

    const [filters, setFilters] = useState({
        page: 0
    })

    useEffect(() => {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        API.get('user/customer',token).then((response)=> {
                setListCustomer(response.data.content);
                console.log(response.data.content);
                setPagination({
                    page: response.data.pageIndex,
                    totalPages: response.data.totalPage
                })
            }).catch((error) =>{
            });
    }, [runuseEff, filters])

    function handlePageChange(newPage) {   
        setFilters({
            page: newPage
        })

    }

    function deleteCustomer (id) {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        API.delete(`user/${id}`,token).then((response)=> {
            alert(response.data.message)
            setrunuseEff(id)
        }).catch((error) =>{
            alert(error.data)
        });
    }
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Customer</h4>
                        </div>

                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">List Customer <button className="btn1 btn btn-success" onClick ={e => {history.push("/new-customer")}}>New</button></h4>
                                </div>
                                {(alert.report != "") ?
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                            {alert.report}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div> : <div></div>
                                }
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>                                            
                                            <th scope="col">Full Name</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListCustomer.map((Customer) => (
                                                <tr key = {Customer.id}>
                                                    <th scope="row">{Customer.id}</th>
                                                    <td>{Customer.fullName}</td>
                                                    <td>{Customer.userName}</td>
                                                    <td>{Customer.email}</td>
                                                    <td>{Customer.phoneNumber}</td>
                                                    <td>{Customer.address}</td>
                                                    <td><button className="btn btn-info" onClick ={ e=> {history.push(`/edit-customer/${Customer.id}`)}}>Edit</button> <button
                                                     className="btn btn-danger" onClick = {deleteCustomer.bind(this,Customer.id)}>Delete</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination
                        pagination={pagination}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
    )
}
