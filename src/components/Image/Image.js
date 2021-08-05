import React , {useState , useEffect, useContext} from 'react'
import {useHistory } from 'react-router-dom';
import Api from '../Config/Api';
import Pagination from '../Pagination';
import {LoginContext} from '../Context/LoginContext'
import { success } from '../Helper/Notification';
import Search from '../Search';
export default function Image() {
    const [Listimage , setListimage] = useState([]);
    const history = useHistory();
    const check = useContext(LoginContext);
    var token =  {headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      } 
    }
    const [filters, setFilters] = useState({
        page: 0,
        id : 0
    })
    const [toggle, settoggle] = useState(false)
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })
    useEffect(() => {
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
        Api.delete(`image/${id}`,token).then((response)=> {
            setFilters({...filters, id :id});
            success('Deleted Successfully Image');
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
            <div className="page-wrapper" onClick={()=> settoggle(false)}>
                <div className="page-breadcrumb">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Image</h4>
                        </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">List image </h4>
                                        <Search token={token} setList= {setListimage} toggle={toggle} settoggle={settoggle} endpoint = {"image"} setPagination={setPagination}></Search>
                                        <button className="btn1 btn btn-success" onClick ={e => {history.push("/newimage")}}>New</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                            {Listimage.map((image) => (
                                                <tr key={image.id}>
                                                    <th scope="row">{image.id}</th>
                                                    <td>{image.name}</td>
                                                    <td><a href={image.link} target="_blank"> <img className="img-link" src={image.link}/> </a></td>
                                                    <td><button className="btn btn-info"  onClick ={e => {history.push(`/editimage/${image.id}`)}}>Edit</button> <button className="btn btn-danger" onClick={deleteimage.bind(this,image.id)}>Delete</button></td>
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
