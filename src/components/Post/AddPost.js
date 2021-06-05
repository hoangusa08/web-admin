import API from '../Config/Api';
import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useHistory } from 'react-router';
import { success } from '../Helper/Notification';
function AddPost(props) {
    const [post, setPost] = useState({
        id: "",
        content: "",
        id_image: 0,
        link_image: ""
    });

    const history=useHistory();
    const check = useContext(LoginContext);
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    const [listImage, setlistImage] = useState([]);
    const [search, setsearch] = useState(
        {
            bool : false , 
            name : "brand",
            string : ""
        }
    )
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
    const onChange = (e) => {  
        e.persist();  
        setPost({...post, [e.target.name]: e.target.value});  
    } 

    const addPost =  (e) =>{
        const data = {
            content: post.content,
            id_image: post.id_image,
            title: post.title
        }

        API.post('post', data, token)
        .then(response => {
            console.log(response.data)
            history.push({
                pathname: '/posts',
               
            }) 
            success('Add Success Post');
        })
        .catch(errors => {
            console.log(errors)
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
                        <h4 className="card-title">New Post</h4>
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label for="name">Title</label>
                                <input type="text" className="form-control"  id="title" name="title"
                                    onChange = {onChange} value={post.title}
                                 />
                            </div>
                            <div className="form-group">
                                    <label  htmlFor="image">Image</label>
                                    <input list="image" className="form-control"  type="text"
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