import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import { useHistory } from 'react-router';
import Api from '../Config/Api';
export default function ProductDetail() {
    const check = useContext(LoginContext);
    const [datainput, setdatainput] = useState({})
    const history = useHistory();
    useEffect(() => {
        async function getdata (){
            check.checklogin();
            let id = history.location.pathname.split("/")[2];
            let token = {headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                        }}
            Api.get('product/'+id, token).then((response)=> {
                setdatainput(response.data);
            }).catch((error) =>{
    
            }); 
        }
        getdata()
    }, []);
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
                                <label for="name">Id</label>
                                <input type="text" className="form-control" value={datainput.id} id="name" disabled/>
                            </div>
                            <div className="form-group">
                                <label for="name">Name</label>
                                <input type="text" className="form-control" value={datainput.name} id="name" disabled/>
                            </div>
                            <div className="form-group">
                                <label  for="price">Price</label>
                                <input type="text" className="form-control" value={datainput.price} id="price" disabled/>
                            </div>
                            <div className="form-group">
                                <label for="number_of_star">Number of star</label>
                                <input type="text" className="form-control"  value={datainput.number_of_star} id="number_of_star" disabled
                                 />
                            </div>
                            <div className="form-group">
                                <label for="des">Description</label>
                                <CKEditor
                                    disabled
                                    editor={ ClassicEditor }
                                    data={datainput.des}
                                    onReady={ editor => {
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        console.log( { event, editor, data } );
                                    } }
                                />
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="idlabel" for="brand">Brand</label>
                                    <input className="col-md-3" id="brand" value={datainput.brandName} disabled />
                                    <label className="idlabel" for="category">Category</label>
                                    <input className="col-md-3" id="brand" value={datainput.categoryName} disabled />
                                    <label className="idlabel" for="category">Image</label>
                                    <input className="col-md-3" id="brand" value={datainput.iamgeName} disabled />
                                </div>
                            </div>
                            { (datainput.m !== "") ? (
                                 <div className="form-group">
                                    <div className="row">
                                        <label className="idlabel" for="size">Size  :</label>
                                        <input className="col-md-3" id="brand" value="M" disabled />
                                        <label className="idlabel" for="Color">Color</label>
                                        <input className="col-md-3" id="brand" value={datainput.m} disabled />
                                        <label className="idlabel" for="image">Number</label>
                                        <input className="col-md-3" id="brand" value={datainput.m_Number} disabled />
                                    </div>
                                </div>
                            ) : (
                                <div>    </div>
                            )}
                             { (datainput.xxl !== "") ? (
                                 <div className="form-group">
                                    <div className="row">
                                        <label className="idlabel" for="size">Size  :</label>
                                        <input className="col-md-3" id="brand" value="XXL" disabled />
                                        <label className="idlabel" for="Color">Color</label>
                                        <input className="col-md-3" id="brand" value={datainput.xxl} disabled />
                                        <label className="idlabel" for="image">Number</label>
                                        <input className="col-md-3" id="brand" value={datainput.xxl_Number} disabled />
                                    </div>
                                </div>
                            ) : (
                                <div>    </div>
                            )}
                             { (datainput.l !== "") ? (
                                 <div className="form-group">
                                    <div className="row">
                                        <label className="idlabel" for="size">Size  :</label>
                                        <input className="col-md-3" id="brand" value="L" disabled />
                                        <label className="idlabel" for="Color">Color</label>
                                        <input className="col-md-3" id="brand" value={datainput.l} disabled />
                                        <label className="idlabel" for="image">Number</label>
                                        <input className="col-md-3" id="brand" value={datainput.l_Number} disabled />
                                    </div>
                                </div>
                            ) : (
                                <div>    </div>
                            )}
                             { (datainput.xl !== "") ? (
                                 <div className="form-group">
                                    <div className="row">
                                        <label className="idlabel" for="size">Size  :</label>
                                        <input className="col-md-3" id="brand" value="XL" disabled />
                                        <label className="idlabel" for="Color">Color</label>
                                        <input className="col-md-3" id="brand" value={datainput.xl} disabled />
                                        <label className="idlabel" for="image">Number</label>
                                        <input className="col-md-3" id="brand" value={datainput.xl_Number} disabled />
                                    </div>
                                </div>
                            ) : (
                                <div>    </div>
                            )}
                            <div className="form-group">
                                <label >Gender</label>
                                <input type="text" className="form-control"  value={datainput.genderName} disabled
                                 />
                            </div>
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn" onClick = { (e) => {history.push("/products")}}> Back </button>
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
