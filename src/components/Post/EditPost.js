import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import {useHistory} from 'react-router-dom'
import API from '../Config/Api';
import { success } from '../Helper/Notification';
export default function EditPost(props) {
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    const history = useHistory();
    const [post, setPost] = useState({
        title : "",
        content : "",
        id_image : 0,
        link_image: "",
    });
    const [listImage, setlistImage] = useState([]);
    const [search, setsearch] = useState(
        {
            bool : false , 
            name : "brand",
            string : ""
        }
    )
    const check = useContext(LoginContext);
    const idPost = props.match.params.id
    useEffect(() => {
            check.checklogin();
          
            API.get('post/' + idPost, token).then((response)=> {
                let temp = response.data[0]
                 console.log(response.data)
                setPost({...post,
                    title: temp.title,
                    id_image: temp.idImage,
                    link_image: temp.linkImage
                });
                setPost({...post, 
                    content: temp.content,
                })

            }).catch((error) =>{
    
            });

    }, []);

    useEffect(() => {
        async function getdata (){
            check.checklogin();
            API.get('image', token).then((response)=> {
                setlistImage(response.data.content);
            }).catch((error) =>{
    
            });
        }
        getdata()
    }, []);

    useEffect(() => {
        async function getdatas (){
            switch (search.name) {
                case "image":
                    API.get('image?search='+search.string, token).then((response)=> {
                        setlistImage(response.data.content);
                    }).catch((error) =>{
            
                    }); 
                    break;
                default:
                    break;
            }
        }
        if(search.bool === true){ getdatas()}
    }, [search]);

    const editPost =  (e) =>{
        e.preventDefault();  
        console.log(post)
        const dataPost = {
            content: post.content,
            id_image: post.id_image,
            title: post.title
        }
        console.log(dataPost)
        
        API.patch('post/' + idPost, dataPost, token).then((response) => {
            console.log(response.data)
            history.push({
                pathname: '/posts',
            }) 
            success('Edit Success Post');
        }).catch((error) => {

        });
        // console.log(category);
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
                                    onChange={e => setPost({...post ,title : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                    <label  htmlFor="image">Image</label>
                                    <input list="image" className="form-control"  type="text" value={post.id_image} 
                                        onChange={e => {setPost({...post ,id_image : e.target.value })
                                        setsearch({...search , bool : true , name : "image" , string : e.target.value})
                                        }}></input>
                                    <datalist id="image">
                                        {listImage.map((ima) => (
                                           <option value={ima.id} key={ima.id}>{ima.name}</option>
                                        ))}
                                    </datalist>
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
                                <button type="button" name="example-email" className="btn btn-info" onClick={editPost}>Save </button>
                               
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
