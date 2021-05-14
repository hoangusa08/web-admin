import React , {useState , useEffect, useContext} from 'react'
import API from '../Config/Api'
import { Link, useHistory } from 'react-router-dom'
import Pagination from '../Pagination/index'
import queryString from 'query-string'
import { LoginContext } from '../Context/LoginContext'
export default function Category() {
    const check = useContext(LoginContext);

    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })

    const [filters, setFilters] = useState({
        page: 0,
        category_edit_id: 0
    })
    const history = useHistory()
    const [ListCategory , setListCategory] = useState([]);

    useEffect(() => {
        // const paramsString = queryString.stringify(filters)
        // const requestUrl = `category?${paramsString}`
        // API.get(requestUrl).then((response)=> {
        //         console.log(response.data)
        //         setListCategory(response.data.content);
        //         setPagination({
        //             page: response.data.pageIndex,
        //             totalPages: response.data.totalPage
        //         })
        //     }).catch((error) =>{
        //         });

        async function getData () {
            let token = {
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
            }
            check.checklogin();
            const paramsString = queryString.stringify(filters)
            const requestUrl = `category?${paramsString}`
            API.get(requestUrl,token).then((response)=> {
                setListCategory(response.data.content);
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
        // console.log(filters)
        // console.log('New page: ', newPage)
    }

    const deleteCategory = (e) => {
        e.preventDefault()
        let id = e.target.id.toString()
        // console.log(id)
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        API.delete('category/' + id,token)
        .then(response => {
            setFilters({...filters, category_edit_id: id})
            console.log(response.data)
            // alert("Xóa category thành công")
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
                            <h4 className="page-title">Category</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Category</li>
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
                                        <h4 className="card-title">List Category <button className="btn1 btn btn-success" onClick ={e => {history.push("/addcategory")}} >New</button></h4>
                                </div>
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
                                        
                                            {ListCategory.map((Category) => (
                                                <tr key = {Category.id}>
                                                    <th scope="row">{Category.id}</th>
                                                    <td>{Category.name}</td>
                                                  
                                                    <td>
                                                        <button className="btn btn-info"  onClick ={ e => {history.push(`/editcategory/${Category.id}`)}}>Edit</button> <button className="btn btn-danger" id = {Category.id} onClick={deleteCategory}>Delete</button>
                                                    </td>
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
