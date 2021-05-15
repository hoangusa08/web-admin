import React , {useState , useEffect, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom';
import Api from '../Config/Api';
import Pagination from '../Pagination';
import {LoginContext} from '../Context/LoginContext'

export default function Color() {
    const [ListColor , setListColor] = useState([]);
    const history = useHistory();
    const check = useContext(LoginContext);
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
            Api.get('color?page='+filters.page, token).then((response)=> {
                setListColor(response.data.content);
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
    function deleteColor (id) {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        Api.delete('color/'+id, token).then((response)=> {
            setFilters({...filters , id :id });
        }).catch((error) =>{

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
                        <h4 className="page-title">Color</h4>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">List Color <button className="btn1 btn btn-success" onClick ={e => {history.push("/newColor")}}>new</button></h4>
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
                                        
                                            {ListColor.map((Color) => (
                                                <tr key={Color.id}>
                                                    <th scope="row">{Color.id}</th>
                                                    <td>{Color.name}</td>
                                                    <td><button className="btn btn-info"  onClick ={e => {history.push(`/editColor/${Color.id}`)}}>Edit</button> <button className="btn btn-danger" onClick={deleteColor.bind(this,Color.id)}>Delete</button></td>
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
        )}
        </>
    )
}
