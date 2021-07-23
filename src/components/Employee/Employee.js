import React , {useState , useEffect, useContext} from 'react'
import Api from '../Config/Api'
import {useHistory } from 'react-router-dom';
import {LoginContext} from '../Context/LoginContext'
import { success } from '../Helper/Notification';
import Pagination from '../Pagination';
import Search from '../Search';

export default function Employee() {
    const history = useHistory();
    const check = useContext(LoginContext);
    const [ListEmployee , setListEmployee] = useState([]);
    const [runuseEff, setrunuseEff] = useState(1)
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })
    const [toggle, settoggle] = useState(false)
    const [filters, setFilters] = useState({
        page: 0,
        id : 0
    })

    let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    useEffect(() => {
        Api.get('admin/user/employee',token).then((response)=> {
                setListEmployee(response.data.content);
                setPagination({
                    page: response.data.pageIndex,
                    totalPages: response.data.totalPage
                })
            }).catch((error) =>{
            });
    }, [runuseEff])
    function handlePageChange(newPage) {
        setFilters({ ...filters ,
            page: newPage
        })
    }
    function deleteEmployee (id) {
        Api.delete(`admin/user/${id}`,token).then((response)=> {
            setrunuseEff(id)
            success('Deleted employee successfully');
        }).catch((error) =>{
            alert(error.data)
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
                        <h4 className="page-title">Employee</h4>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">List Employee </h4>
                                        <Search token={token} setList= {setListEmployee} toggle={toggle} settoggle={settoggle} endpoint = {"admin/user/employee"}></Search>
                                        <button className="btn1 btn btn-success" onClick ={e => {history.push("/newemployee")}}>new</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>                                            
                                            <th scope="col">Full Name</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListEmployee.map((Employee) => (
                                                <tr key={Employee.id}>
                                                    <th scope="row">{Employee.id}</th>
                                                    <td>{Employee.fullName}</td>
                                                    <td>{Employee.userName}</td>
                                                    <td>{Employee.phoneNumber}</td>
                                                    <td>{Employee.email}</td>
                                                    <td>{Employee.address}</td>
                                                    <td><button className="btn btn-info" onClick ={ e=> {history.push(`/editemployee/${Employee.id}`)}}>edit</button> <button
                                                     className="btn btn-danger" onClick = {deleteEmployee.bind(this,Employee.id)}>delete</button></td>
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
