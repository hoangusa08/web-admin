import React , {useState , useEffect, useContext} from 'react'
import Pagination from '../Pagination/index'
import { useHistory } from 'react-router-dom';
import Api from '../Config/Api';
import {LoginContext} from '../Context/LoginContext'
import { success } from '../Helper/Notification';
export default function Brand() {
    var token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    const [searchValue, setsearchValue] = useState("")
    const check = useContext(LoginContext);
    const [ListBrand , setListBrand] = useState([]);
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
        Api.get('brand?page='+filters.page, token).then((response)=> {
            setListBrand(response.data.content);
            setPagination({
                page: response.data.pageIndex,
                totalPages: response.data.totalPage
            })
        }).catch((error) =>{

        }); 
    }, [filters])
    function handlePageChange(newPage) {    
        setFilters({...filters,
            page: newPage
        })
        console.log(newPage)
    }
    function deletebrand (id) {
        Api.delete('brand/'+id, token).then((response)=> {
            setFilters({...filters , id :id });
            success('Deleted category');
        }).catch((error) =>{

        }); 
    }
    function search (){
        if (searchValue !== "")
        Api.get('brand?search='+searchValue, token).then((response)=> {
            // console.log(response.data)
            // setListBrand(response.data.content);
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
                        <h4 className="page-title">Brand</h4>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">List Brand</h4>
                                        <input placeholder="Search..." onChange={e =>{ setsearchValue(e.target.value)}}
                                        value={searchValue}  className="input-search"></input>
                                        <button onClick={search} className="btn-search "><i  className="fa fa-search" aria-hidden="true"></i></button>
                                        <button className="btn1 btn btn-success" onClick ={e => {history.push("/newbrand")}}>New</button>
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
                                        
                                            {ListBrand.map((brand) => (
                                                <tr key={brand.id}>
                                                    <th scope="row">{brand.id}</th>
                                                    <td>{brand.name}</td>
                                                    <td><button className="btn btn-info"  onClick ={e => {history.push(`/editbrand/${brand.id}`)}}>Edit</button> <button className="btn btn-danger" onClick={deletebrand.bind(this, brand.id)}>Delete</button></td>
                                                
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination
                                        pagination={pagination}
                                        onPageChange={handlePageChange}
                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         )}
         </>
    )
}
