import React , {useState , useEffect, useContext} from 'react'
import API from '../Config/Api';
import { Link } from 'react-router-dom'
import Pagination from '../Pagination/index'
import queryString from 'query-string'
import {LoginContext} from '../Context/LoginContext'
import { useHistory } from 'react-router';
import { success } from '../Helper/Notification';
export default function Review() {
    const [searchValue, setsearchValue] = useState("")
    const history = useHistory()
    const check = useContext(LoginContext);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })

    const [filters, setFilters] = useState({
        page: 0,
        category_delete_id: 0
    })

    const [ListReview , setListReview] = useState([]);

    let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    useEffect(() => {
        async function getData () {

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

        API.delete('review/' + id, token)
        .then(response => {
            setFilters({...filters, category_delete_id: id})
            // console.log(response.data)
            success('Deleted review');
    
        })
        .catch(errors => {
              console.log(errors)
        })
    }

    function search (){
        if (searchValue !== "")
        API.get('review?search='+searchValue, token).then((response)=> {
            // console.log(response.data)
            setListReview(response.data.content);
            setPagination({
                page: response.data.pageIndex,
                totalPages: response.data.totalPage
            })
        }).catch((error) =>{
        }); 
        
    }

    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Review</h4>
                        </div>
                        
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">List Review </h4>
                                    <input class="input-search" placeholder="Search..." onChange={e =>{ setsearchValue(e.target.value)}}
                                    value={searchValue}></input>
                                    <button className="btn-search " onClick={search}><i className="fa fa-search"></i></button>
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
                                                    <td>  <button id = {Review.id} onClick={deleteReview} className="btn btn-danger">Delete</button></td>
                                                    {/* <td><button id = {Review.id} onClick ={ e=> {history.push(`/view-review/${Review.id}`)}} className="btn btn-success">View</button></td> */}
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
