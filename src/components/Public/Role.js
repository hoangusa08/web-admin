import React , {useState , useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
export default function Role() {
    const [ListBrand , setListBrand] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/brand',
        {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        } 
        }).then((response)=> {
                setListBrand(response.data.content);
            }).catch((error) =>{
            });
    }, [])
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Brand</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Brand</li>
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
                                        <h4 class="card-title">List brand <button className="btn1 btn" onClick ={e => {history.push("/newbrand")}}>new</button></h4>
                                </div>
                                <div class="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                            {ListBrand.map((brand) => (
                                                <tr>
                                                    <th scope="row">{brand.id}</th>
                                                    <td>{brand.name}</td>
                                                    <td><button className="btn"  onClick ={e => {history.push(`/editbrand/${brand.id}`)}}>edit</button></td>
                                                    <td><button className="btn">delete</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
