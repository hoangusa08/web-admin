import React , {useState , useEffect, useContext} from 'react'
import API from '../Config/Api';
import { Link } from 'react-router-dom'
import Pagination from '../Pagination/index'
import queryString from 'query-string'
import {LoginContext} from '../Context/LoginContext'
export default function Review() {
    const check = useContext(LoginContext);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })

    const [filters, setFilters] = useState({
        page: 0
    })

    const [ListReview , setListReview] = useState([]);


    useEffect(() => {
        // const paramsString = queryString.stringify(filters)
        // const requestUrl = `review?${paramsString}`
        // API.get(requestUrl)
        //     .then((response)=> {
        //         setListReview(response.data.content)
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
            const requestUrl = `review?${paramsString}`
            API.get(requestUrl,token).then((response)=> {
                setListReview(response.data.content)
                setPagination({
                    page: response.data.pageIndex,
                    totalPages: response.data.totalPage
                })
                console.log(response.data);
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
    const viewReview = (e) => {
        e.preventDefault()
        let id = e.target.id.toString()
        console.log(id)
    }

    const deleteReview = (e) => {
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
                                                <th scope="col">Star</th>
                                                <th scope="col">Content</th>                                                
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListReview.map((Review) => (
                                                <tr key={Review.id}>
                                                    <th scope="row">{Review.id}</th>
                                                    <td>{Review.number_Of_Star}</td>
                                                    <td>{Review.content}</td>
                                                    <td>{Review.name_User}</td>
                                                    <td>{Review.email}</td>
                                                    <td>{Review.name_Product}</td>
                                                    <td> <button id = {Review.id} onClick={viewReview} className="btn btn-success">View</button> <button id = {Review.id} onClick={deleteReview} className="btn btn-danger">Delete</button></td>
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
