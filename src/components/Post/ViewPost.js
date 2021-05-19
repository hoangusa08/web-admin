import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import {useHistory} from 'react-router-dom'
import API from '../Config/Api';
export default function ViewPost(props) {
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    const history = useHistory();
    const [post, setPost] = useState({
        title : "",
        content : "",
        id_image : 0
    });
    const check = useContext(LoginContext);
    const idPost = props.match.params.id
    useEffect(() => {
            check.checklogin();
          
            API.get('post/' + idPost, token).then((response)=> {
                let temp = response.data
                // console.log(response.data)
                setPost({...post,
                    title: temp.title,
                    
                    id_image: temp.id_image
                });
                setPost({...post, 
                    content: temp.content,
                })

            }).catch((error) =>{
    
            });

    }, []);

    const back =  (e) =>{
        e.preventDefault();  
        history.push({
            pathname: '/posts',
            
        }) 
    }

    return (
        <>
        {(check.IsLogin === false ) ? (
            <div className="page-wrapper">
                <h3 style={{textAlign : "center"}}>You need login</h3>
            </div>
        ) : (
        <div className="page-wrapper">
        <div className="page-breadcrumb">
            <div className="col-5 align-self-center">
                <h4 className="page-title">Post</h4>
            </div>
               
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <h4 className="card-title">Edit Post</h4>
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" value={post.title} id="title" name="title"
                                    onChange={e => setPost({...post ,title : e.target.value})} readOnly/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <CKEditor
                                    
                                    editor = { ClassicEditor }
                                    data = {post.content}
                                    onReady={ editor => {
                                        // console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        // let data = editor.getData();
                                        setPost({...post , content : editor.getData()});
                                    } }
                                />
                            </div>
  
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn btn-info" onClick={back}>Back </button>
                               
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
