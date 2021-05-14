import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import {useHistory} from 'react-router-dom'
import API from '../Config/Api';
export default function EditProduct() {
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    const history = useHistory();
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [listImage, setlistImage] = useState([]);
    const [listColor, setlistColor] = useState([])
    const check = useContext(LoginContext);
    let array = window.location.pathname.split("/");
    const [dataoutput, setdataoutput] = useState({
        id_cate: 0,
        id_brand: 0,
        id_gender : 0,
        name: "",
        price: "",
        name_size : "L",
        number : "",
        id_image : 0,
        id_color : 0,
        des: "",
    })
    const [search, setsearch] = useState(
        {
            bool : false , 
            name : "brand",
            string : ""
        }
    )
    useEffect(() => {
        // async function getdata (){
            check.checklogin();
            API.get('product/getOneToUpdate/' + array[array.length-1], token).then((response)=> {
                let temp = response.data
                setdataoutput({...dataoutput ,
                    id_cate: temp.id_cate,
                    id_brand: temp.id_brand,
                    id_gender : temp.id_gender,
                    name: temp.name,
                    price: temp.price,
                    name_size : temp.name_size,
                    number : temp.number,
                    id_image : temp.id_image,
                    id_color : temp.id_color,
                })
                setdataoutput({...dataoutput , des: temp.des})
            }).catch((error) =>{
             
            });
          
            API.get('category', token).then((response)=> {
                setlistCategory(response.data.content);
            }).catch((error) =>{
    
            });
            API.get('image', token).then((response)=> {
                setlistImage(response.data.content);
            }).catch((error) =>{
    
            });
            API.get('brand', token).then((response)=> {
                setlistBrand(response.data.content);
            }).catch((error) =>{
    
            });
            API.get('color', token).then((response)=> {
                setlistColor(response.data.content);
            }).catch((error) =>{
    
            });
        // }
        // getdata()
    }, []);
    useEffect(() => {
        async function getdatas (){
            switch (search.name) {
                case "brand":
                    API.get('brand?search='+search.string, token).then((response)=> {
                        setlistBrand(response.data.content);
                    }).catch((error) =>{
            
                    }); 
                    break;
                case "category":
                    API.get('category?search='+search.string, token).then((response)=> {
                        setlistCategory(response.data.content);
                    }).catch((error) =>{
            
                    }); 
                    break;
                case "color":
                    API.get('color?search='+search.string, token).then((response)=> {
                        setlistColor(response.data.content);
                    }).catch((error) =>{
            
                    }); 
                    break;
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
    function save () {
        API.patch('product/'+array[array.length-1], dataoutput,token).then((response)=> {
            alert(response.data.message);
                history.push('/products')
            }).catch((error) =>{
                console.log(error.response)
            });
    }
    function clog (){
        console.log(dataoutput);
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
                    <h4 className="page-title">Edit Product</h4>
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
                                <label for="name">Name</label>
                                <input type="text" className="form-control" value={dataoutput.name} id="name"
                                 onChange={e => setdataoutput({...dataoutput ,name : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label  for="price">Price</label>
                                <input type="text" className="form-control" value={dataoutput.price} id="price"
                                 onChange={e => setdataoutput({...dataoutput ,price : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label for="des">Description</label>
                                <CKEditor
                                    
                                    editor={ ClassicEditor }
                                    data={dataoutput.des}
                                    onReady={ editor => {
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        let data = editor.getData();
                                        setdataoutput({...dataoutput , des : data});
                                    } }
                                />
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="idlabel" for="brand">Brand</label>
                                    <input list="brand" className="col-md-3" value={dataoutput.id_brand} 
                                        onChange={ e => {
                                            setdataoutput({...dataoutput ,id_brand : e.target.value })
                                            setsearch({...search , bool : true , name : "brand" , string : e.target.value})
                                        }}></input>
                                    <datalist id="brand">
                                        {listBrand.map((brand) => (
                                           <option value={brand.id} >{brand.name}</option>
                                        ))}
                                    </datalist>
                                    <label className="idlabel" for="category">Category</label>
                                    <input list="cate" className="col-md-3" value={dataoutput.id_cate}
                                        onChange={e => {
                                            setdataoutput({...dataoutput ,id_cate : e.target.value })
                                            setsearch({...search , bool : true , name : "category" , string : e.target.value})
                                            }}></input>
                                    <datalist id="cate">
                                        {listCategory.map((category) => (
                                           <option value={category.id}>{category.name}</option>
                                        ))}
                                    </datalist>
                                    <label className="idlabel" for="image">Image</label>
                                    <input list="image" className="col-md-3" value = {dataoutput.id_image}
                                        onChange={e => {setdataoutput({...dataoutput ,id_image : e.target.value })
                                        setsearch({...search , bool : true , name : "image" , string : e.target.value})
                                        }}></input>
                                    <datalist id="image">
                                        {listImage.map((ima) => (
                                           <option value={ima.id}>{ima.name}</option>
                                        ))}
                                    </datalist>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="idlabel" for="size">Size  :</label>
                                    <input list="size" className="col-md-3" value={dataoutput.name_size}
                                    onChange={e => setdataoutput({...dataoutput ,name_size : e.target.value })}></input>
                                    <datalist id="size">
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </datalist>
                                    <label className="idlabel" for="Color">Color</label>
                                    <input list="color" className="col-md-3" value={dataoutput.id_color}
                                    onChange={e => {setdataoutput({...dataoutput ,id_color : e.target.value })
                                                    setsearch({...search , bool : true , name : "color" , string : e.target.value}) 
                                            }}></input>
                                    <datalist id="color">
                                        {listColor.map((color) => (
                                           <option value={color.id}>{color.name}</option>
                                        ))}
                                    </datalist>
                                    <label  className="idlabel" for="number">Number</label>
                                    <input type="text" className="col-md-3"  value={dataoutput.number} id="number"
                                    onChange={e => setdataoutput({...dataoutput ,number : e.target.value})}/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Gender</label><br></br>
                                <input type="radio" id="male" value="Male" name="gender"
                                onChange={e => setdataoutput({...dataoutput ,id_gender : 1})}/><label for="male" className="idlabel" >Male</label>
                                <input type="radio" id="female" value="Female" name="gender"
                                onChange={e => setdataoutput({...dataoutput ,id_gender : 2})}/><label for="female"className="idlabel" >Female</label>
                                <input type="radio" id="couple" value="Couple" name="gender"
                                onChange={e => setdataoutput({...dataoutput ,id_gender : 3})}/><label for="couple"className="idlabel" >Couple</label><br></br>
                            </div>
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn" onClick={save}>Save </button>
                                <button type="button" name="example-email" className="btn" onClick={clog}>clog </button>
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
