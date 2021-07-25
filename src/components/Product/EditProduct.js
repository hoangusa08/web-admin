import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React , {useState , useEffect, useContext, useRef} from 'react'
import {LoginContext} from '../Context/LoginContext'
import {useHistory} from 'react-router-dom'
import API from '../Config/Api';
import { success } from '../Helper/Notification';
export default function EditProduct() {
    const history = useHistory();
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [listImage, setlistImage] = useState([]);
    const [listColor, setlistColor] = useState([])
    const check = useContext(LoginContext);
    let array = window.location.pathname.split("/");
    const [dataoutput, setdataoutput] = useState({
    })
    var token ={
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    const [search, setsearch] = useState(
        {
            bool : false , 
            name : "brand",
            string : ""
        }
    )
    const typingTimeoutref = useRef(null)
    useEffect(() => {
        async function getdata (){
            check.checklogin();
            let  temp = await API.get('product/getOneToUpdate/' + array[array.length-1], token)
            setdataoutput(temp.data)
            await API.get('category', token).then((response)=> {
                setlistCategory(response.data.content);
            }).catch((error) =>{
    
            });
            await API.get('image', token).then((response)=> {
                setlistImage(response.data.content);
            }).catch((error) =>{
    
            });
            await API.get('brand', token).then((response)=> {
                setlistBrand(response.data.content);
            }).catch((error) =>{
    
            });
            await API.get('color', token).then((response)=> {
                setlistColor(response.data.content);
            }).catch((error) =>{
    
            });
        }
        getdata()
    }, []);
    useEffect(() => {
        async function getdatas (){
            switch (search.name) {
                case "brand":
                    await API.get('brand?search='+search.string, token).then((response)=> {
                        setlistBrand(response.data.content);
                    }).catch((error) =>{
            
                    }); 
                    break;
                case "category":
                    await API.get('category?search='+search.string, token).then((response)=> {
                        setlistCategory(response.data.content);
                    }).catch((error) =>{
            
                    }); 
                    break;
                case "color":
                    await API.get('color?search='+search.string, token).then((response)=> {
                        setlistColor(response.data.content);
                    }).catch((error) =>{
            
                    }); 
                    break;
                case "image":
                    await API.get('image?search='+search.string, token).then((response)=> {
                        setlistImage(response.data.content);
                    }).catch((error) =>{
                    }); 
                    break;
                default:
                    break;
            }
        }
        if(search.bool === true && search.string){ getdatas()}
    }, [search,token]);
    function save () {
        API.patch('product/'+array[array.length-1], dataoutput,token).then((response)=> {
            history.push({
                pathname: '/products', 
            }) 
            success('Edit product Successfully');
            }).catch((error) =>{
                console.log(error.response)
            });
        console.log(dataoutput);
    }
    function handleOnchangeSearch(e , searchBy){
        const value = e.target.value;
        if(typingTimeoutref.current){
            clearTimeout(typingTimeoutref.current);
        }
        typingTimeoutref.current = setTimeout(() => {
            setsearch({...search , bool : true , name : searchBy, string : value})
        } , 300)
        setdataoutput({...dataoutput ,id_brand :  value })
   }
   console.log(dataoutput)
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
                <h4 className="page-title">Edit Product</h4>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" value={dataoutput?.name} id="name"
                                 onChange={e => setdataoutput({...dataoutput ,name : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label  htmlFor="price">Price</label>
                                <input type="text" className="form-control" value={dataoutput?.price} id="price"
                                 onChange={e => setdataoutput({...dataoutput ,price : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="des">Description</label>
                                <CKEditor
                                    
                                    editor={ ClassicEditor }
                                    data={dataoutput?.des}
                                    onReady={ editor => {
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setdataoutput({...dataoutput , des : data});
                                    } }
                                />
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="idlabel" htmlFor="brand">Brand</label>
                                    <input list="brand" className="col-md-3" value={dataoutput?.id_brand} 
                                         onChange={ e =>{handleOnchangeSearch(e , "brand")
                                         setdataoutput({...dataoutput ,id_brand :  e.target.value })
                                         }}></input>
                                    <datalist id="brand">
                                        {listBrand.map((brand) => (
                                           <option value={brand.id} key={brand.id}>{brand.name}</option>
                                        ))}
                                    </datalist>
                                    <label className="idlabel" htmlFor="category">Category</label>
                                    <input list="cate" className="col-md-3" value={dataoutput?.id_cate}
                                        onChange={ e => {
                                            handleOnchangeSearch(e , "category")
                                            setdataoutput({...dataoutput ,id_cate : e.target.value })}}></input>
                                    <datalist id="cate">
                                        {listCategory.map((category) => (
                                           <option value={category.id} key={category.id}>{category.name}</option>
                                        ))}
                                    </datalist>
                                    <label className="idlabel" htmlFor="image">Image</label>
                                    <input list="image" className="col-md-3" value = {dataoutput?.id_image}
                                         onChange={ e =>{handleOnchangeSearch(e , "image")
                                         setdataoutput({...dataoutput ,id_image : e.target.value })}}></input>
                                    <datalist id="image">
                                        {listImage.map((ima) => (
                                           <option value={ima.id} key={ima.id}>{ima.name}</option>
                                        ))}
                                    </datalist>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="idlabel" htmlFor="size">Size  :</label>
                                    <input list="size" className="col-md-3" value={dataoutput?.name_size}
                                    onChange={e => setdataoutput({...dataoutput ,name_size : e.target.value })}></input>
                                    <datalist id="size">
                                        <option value="M" key="M">M</option>
                                        <option value="L" key="L">L</option>
                                        <option value="XL" key="XL">XL</option>
                                        <option value="XXL" key="XXL">XXL</option>
                                    </datalist>
                                    <label className="idlabel" htmlFor="Color">Color</label>
                                    <input list="color" className="col-md-3" value={dataoutput?.id_color}
                                        onChange={ e =>{handleOnchangeSearch(e , "color")
                                        setdataoutput({...dataoutput ,id_color : e.target.value })}}></input>
                                    <datalist id="color">
                                        {listColor.map((color) => (
                                           <option value={color.id} key={color.id}>{color.name}</option>
                                        ))}
                                    </datalist>
                                    <label  className="idlabel" htmlFor="number">Number</label>
                                    <input type="text" className="col-md-3"  value={dataoutput?.number} id="number"
                                    onChange={e => setdataoutput({...dataoutput ,number : e.target.value})}/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Gender</label><br></br>
                                <input type="radio" id="male" value="Male" name="gender" checked={dataoutput?.id_gender === 1}
                                onChange={e => setdataoutput({...dataoutput ,id_gender : 1})}/><label htmlFor="male" className="idlabel" >Male</label>
                                <input type="radio" id="female" value="Female" name="gender" checked={dataoutput?.id_gender === 2}
                                onChange={e => setdataoutput({...dataoutput ,id_gender : 2})}/><label htmlFor="female"className="idlabel" >Female</label>
                                <input type="radio" id="couple" value="Couple" name="gender" checked={dataoutput?.id_gender === 3}
                                onChange={e => setdataoutput({...dataoutput ,id_gender : 3})}/><label htmlFor="couple"className="idlabel" >Couple</label><br></br>
                            </div>
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn btn-info" onClick={save}>Save </button>
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
