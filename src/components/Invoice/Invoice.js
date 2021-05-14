import React , {useState , useEffect, useContext} from 'react'
import API from '../Config/Api';
import { Link } from 'react-router-dom'
import Pagination from '../Pagination/index'
import queryString from 'query-string'
import {LoginContext} from '../Context/LoginContext'
export default function Invoice() {
    const check = useContext(LoginContext);
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
        // const paramsString = queryString.stringify(filters)
        // const requestUrl = `invoice/ByEmployee?${paramsString}`
        // API.get(requestUrl)
        //     .then((response)=> {
        //         setListInvoice(response.data.content)
        //         setPagination({
        //             page: response.data.pageIndex,
        //             totalPages: response.data.totalPage
        //         })
        //     }).catch((error) =>{
        // });

        async function getData () {
            let token = {
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
            }
            check.checklogin();
            const paramsString = queryString.stringify(filters)
            const requestUrl = `invoice/ByEmployee?${paramsString}`
            API.get(requestUrl,token).then((response)=> {
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
    const viewInvoice = (e) => {
        e.preventDefault()
        let id = e.target.id.toString()
        console.log(id)
    }

    const deleteInvoice = (e) => {
        e.preventDefault()
        let id = e.target.id.toString()
        console.log(id)

        var path = 'review/'
        path += id

        API.delete(path)
        .then(response => {
           
            console.log(response.data)
            alert("Xóa review thành công")
            // window.localStorage.removeItem("cart")
            // history.push('/home')
    
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
                                                <th scope="col">Employee</th>
                                                <th scope="col">Status</th>                                                
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListInvoice.map((Invoice) => (
                                                <tr key={Invoice.id}>
                                                    <th scope="row">{Invoice.id}</th>
                                                    <td>{(Invoice.fullname_employee) ? Invoice.fullname_employee : "Customer"}</td>
                                                    <td>{(Invoice.is_paid) ? "Paid" : "Unpaid"}</td>

                                                    <td> <button id = {Invoice.id} onClick={viewInvoice} className="btn btn-success">View</button> <button id = {Invoice.id} onClick={deleteInvoice} className="btn btn-danger">Delete</button></td>
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
