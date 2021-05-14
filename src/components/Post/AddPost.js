import API from '../Config/Api';
import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useHistory } from 'react-router';
function AddPost(props) {
    const [post, setPost] = useState({
        id: "",
        content: "",
        id_image: null
    });
    const history=useHistory();
    const check = useContext(LoginContext);
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }

    const onChange = (e) => {  
        e.persist();  
        setPost({...post, [e.target.name]: e.target.value});  
    } 

    const addPost =  (e) =>{
        const data = {
            content: post.content,
            id_image: 1,
            title: post.title
        }

        API.post('post', data, token)
        .then(response => {
            console.log(response.data)
            history.push('/posts')
        })
        .catch(errors => {
            console.log(errors)
        })
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
            <div className="row">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">New Product</h4>
                </div>
                <div className="col-7 align-self-center">
                    <div className="d-flex align-items-center justify-content-end">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">New Product</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label for="name">Title</label>
                                <input type="text" className="form-control"  id="title" name="title"
                                    onChange = {onChange} value={post.title}
                                 />
                            </div>
                            <div className="form-group">
                                <label for="des">Description</label>
                                <CKEditor
                                    editor = { ClassicEditor }
                                    data = {post.content}
                                    onReady = { editor => {
                                        // console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setPost({...post, content : data})
                                        // console.log( { event, editor, data } );
                                    } }
                                />
                            </div>
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn btn-info" onClick= {addPost}>Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
     )}
     </>
    )
}
export default AddPost