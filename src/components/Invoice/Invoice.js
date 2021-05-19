import React , {useState , useEffect, useContext} from 'react'
import API from '../Config/Api';
import Pagination from '../Pagination/index'
import queryString from 'query-string'
import { useHistory } from 'react-router';
import {LoginContext} from '../Context/LoginContext'
import { useLocation } from "react-router-dom";
export default function Invoice() {
    // console.log(state.report)
    const location = useLocation();
    const check = useContext(LoginContext);
    const history = useHistory()
    const [alert, setAlert] = useState({
        report: ""
    })
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })

    const [filters, setFilters] = useState({
        page: 0
    })

    const [ListInvoice , setListInvoice] = useState([]);
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }

    useEffect(() => {
        if(typeof location.state != "undefined")
            setAlert({...alert, report : location.state.report})
     }, [location]);

    useEffect(() => {
        async function getData () {
            let token = {
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
            }
            check.checklogin();
            const paramsString = queryString.stringify(filters)
            const requestUrl = `/invoice/ByEmployee/status?${paramsString}`
            API.get(requestUrl,token).then((response)=> {
                
                console.log(response.data.content)

                setListInvoice(response.data.content)

                setPagination({
                    page: response.data.pageIndex,
                    totalPages: response.data.totalPage
                })
                
            }).catch((error) =>{
            });
        }
        getData(); 
    }, [filters])

    
    function handlePageChange(newPage) {
       
        setFilters({
            page: newPage
        })
        console.log(filters)
        console.log('New page: ', newPage)
    }


    const deleteInvoice = (e) => {
        e.preventDefault()
        let id = e.target.id.toString()

        API.delete('invoice/' + id, token)
        .then(response => {       
            console.log(response.data)
            // alert("Xóa review thành công")
        })
        .catch(errors => {
              console.log(errors)
        })
    }

    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Invoice</h4>
                        </div>
                        
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">List Invoice <button className="btn1 btn btn-success" onClick ={e => {history.push("/new-invoice")}}>New</button></h4>
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
                                                <th scope="col">Employee</th>
                                                <th scope="col">Status</th>                                                
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListInvoice.map((Invoice) => (
                                                <tr key={Invoice.id}>
                                                    <th scope="row">{Invoice.id}</th>
                                                    <td>{(Invoice.employee) ? Invoice.employee : "Customer"}</td>
                                                    <td>{(Invoice.is_paid) ? "Paid" : "Unpaid"} </td>

                                                    <td> <button id = {Invoice.id} onClick ={ e=> {history.push(`/view-invoice/${Invoice.id}`)}} className="btn btn-success">View</button> <button
                                                                 id = {Invoice.id} onClick ={ e=> {history.push(`/edit-invoice/${Invoice.id}`)}} className="btn btn-info">Edit</button> <button 
                                                                id = {Invoice.id} onClick={deleteInvoice} className="btn btn-danger">Delete</button></td>
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
