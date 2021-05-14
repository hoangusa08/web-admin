import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import Api from '../Config/Api';
import Pagination from '../Pagination';
export default function Image() {
    const [Listimage , setListimage] = useState([]);
    const history = useHistory();
    const [filters, setFilters] = useState({
        page: 0,
        id : 0
    })
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })
    useEffect(() => {
        let token =  {headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            } 
        }
        function getData() {
            Api.get('image?page='+filters.page, token).then((response)=> {
                setListimage(response.data.content);
                setPagination({
                    page: response.data.pageIndex,
                    totalPages: response.data.totalPage
                })
            }).catch((error) =>{
    
            }); 
        }
        getData()
    }, [filters])
    function handlePageChange(newPage) {
        setFilters({ ...filters ,
            page: newPage
        })
    }
    function deleteimage (id) {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        axios.delete(`http://localhost:9090/api/v1/image/${id}`,token).then((response)=> {
            setFilters({...filters, id :id});
        }).catch((error) =>{
        });
    }
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">image</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">image</li>
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
                                        <h4 class="card-title">List image <button className="btn1 btn btn-success" onClick ={e => {history.push("/newimage")}}>new</button></h4>
                                </div>
                                <div class="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Link</th>
                                            <th scope="col">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                            {Listimage.map((image) => (
                                                <tr>
                                                    <th scope="row">{image.id}</th>
                                                    <td>{image.name}</td>
                                                    <td><a href={image.link} target="_blank"> click in here </a>  </td>
                                                    <td><button className="btn btn-info"  onClick ={e => {history.push(`/editimage/${image.id}`)}}>Edit</button> 
                                                    <button className="btn btn-danger" onClick={deleteimage.bind(this,image.id)}>Delete</button></td>
                                              </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    pagination={pagination}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
