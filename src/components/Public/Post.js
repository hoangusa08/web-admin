import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Link , useHistory } from 'react-router-dom';
export default function Post() {
    const history = useHistory();
    const [ListPost , setListPost] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/post').then((response)=> {
                setListPost(response.data.content);
            }).catch((error) =>{
            });
    }, [])
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Post</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Post</li>
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
                                        <h4 className="card-title">List Post <button className="btn1 btn btn-success" onClick ={ e=> {history.push("/newpost")}} >New</button></h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Name</th>
                                                <th scope="col" >Content</th>
                                                <th scope="col">Detail</th>
                                                <th scope="col">Action</th>
                                                <th></th>
                                        
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListPost.map((Post) => (
                                                <tr>
                                                    <th scope="row">{Post.id}</th>
                                                    <td>{Post.name}</td>
                                                    <td>{Post.content}</td>
                                                    <td ><a href={Post.link} target="_blank">click in here</a></td>
                                                    <td><button className="btn btn-success">edit</button> </td>
                                                    <td><button className="btn btn-danger">delete</button></td>
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
