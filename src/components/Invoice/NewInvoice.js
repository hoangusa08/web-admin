import React, { useState, useEffect, useContext } from 'react'
import API from '../Config/Api'
import { useHistory } from 'react-router';
import {LoginContext} from '../Context/LoginContext'
function NewInvoice(props) {
    const history = useHistory();
    const id = props.match.params.id
    let idEmployee = JSON.parse(localStorage.getItem('id'));
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    } 
    const check = useContext(LoginContext);
    const [invoice, setInvoice] = useState({
        id_user : 0,
        id_employee : idEmployee,
        listProduct: [],
        totalMoney: 0
    });
    const [listProductCart, setListProductCart] = useState([])
    const [product, setProduct] = useState({
        id: 0,
        number: 0
    })
    const [listProductAll, setListProductAll] = useState([])
    const [listProductInput, setListProductInput] = useState([])
    const [listCustomerInput, setListCustomerInput] = useState([])

    const [search, setSearch] = useState(
        {
            bool : false , 
            name : "customer",
            string : ""
        }
    )
    useEffect(() => {
        API.get('/product/all', token).then((response)=> {
            setListProductAll(response.data)               
        }).catch((error) =>{
        });
    }, []);

    useEffect(() => {
        check.checklogin();
        let listProductInvoice = []
        let total_money = 0
        for(let indexCart = 0; indexCart < listProductCart.length; indexCart++){
            for(let index = 0; index < listProductAll.length; index++){
                console.log(listProductAll[index])
                if(listProductAll[index].id == listProductCart[indexCart].id) {
                    let dataProduct = {
                        id: listProductAll[index].id,
                        name_Product: listProductAll[index].name,
                        name_Color: listProductAll[index].name_Color,
                        name_Size: listProductAll[index].name_Size,
                        number_Product: listProductCart[indexCart].number,
                        totalMoney: listProductCart[indexCart].number * listProductAll[index].price
                    }
                    total_money += dataProduct.totalMoney
                    listProductInvoice.push(dataProduct)
                    break
                }
                
            }
        }
        console.log(listProductInvoice)
        console.log(listProductCart)
        setInvoice({...invoice, listProduct: listProductInvoice, totalMoney: total_money})
        
    }, [product]);

    useEffect(() => {
            API.get('product', token).then((response)=> {
                setListProductInput(response.data.content);
            }).catch((error) =>{
    
            }); 
            API.get('user/customer', token).then((response)=> {
                setListCustomerInput(response.data.content);
            }).catch((error) =>{
    
            }); 
    }, [])
    useEffect(() => {
        async function getdatas (){
            switch (search.name) {
                case "product":
                    API.get('product?search='+search.string, token).then((response)=> {
                        setListProductInput(response.data.content);
                    }).catch((error) =>{
            
                    }); 
                    break;
                case "customer":
                    API.get('user/customer?search='+search.string, token).then((response)=> {
                        setListCustomerInput(response.data.content);
                        console.log(response.data.content);
                    }).catch((error) =>{
            
                    }); 
                    break;
                default:
                    break;
            }
        }
        if(search.bool === true){ getdatas()}
    }, [search]);

    const addToListProduct = (e) => {
        e.preventDefault();  
        if (product.id != 0) {
            let list = listProductCart
            let checkExistence = false
    
            for (let index = 0; index < list.length; index++){
                if(list[index].id == product.id){
                    checkExistence = true
                    list[index].number = parseInt(list[index].number)  + parseInt(product.number)
                }
            }               
            if (!checkExistence)
                list.push({
                    id: product.id,
                    number: parseInt(product.number)
                })
    
            setListProductCart(list)
            setProduct({...product, id: 0, number: 0})
        }
    }


    const addInvoice = (e) => {
        e.preventDefault();  
        const data = {
            id_user: parseInt(invoice.id_user),
            id_employee: invoice.id_employee,
            listProducts: listProductCart,
            totalMoney: invoice.totalMoney
        }
    
        API.post('invoice', data, token)
        .then(response => {
           
            console.log(response.data)
            // alert("Đặt hàng thành công")
            // window.localStorage.removeItem("cart")
            history.push({
                pathname: '/invoice',
                state: { report: 'Đặt hàng thành công' }
            })
    
        })
        .catch(errors => {
              console.log(errors)
        })
    }

    
    return (
        <div className="page-wrapper">
        <div className="page-breadcrumb">
            <div className="row">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">Invoice</h4>
                </div>
                
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <h4 className="card-title">Edit Invoice</h4>
                        <form className="form-horizontal m-t-30" >
                            <div className="form-group" >
                                <label>Id Customer</label>
                                {/* <input type="text" className="form-control" onChange={e => setInvoice({...invoice ,id_user : e.target.value})} value={invoice.id_user}/> */}
                                <input list="cat" className="form-control"
                                        onChange={e => {
                                            setInvoice({...invoice ,id_user : e.target.value})
                                            setSearch({...search , bool : true , name : "customer" , string : e.target.value})
                                            }}></input>
                                <datalist id="cat">
                                    {listCustomerInput.map((category) => (
                                        <option value={category.id} key={category.id}>{category.fullName}</option>
                                    ))}
                                </datalist>
                            </div>
                            <div className="form-group" >
                            <div className="table-responsive">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="">Id Product</span>
                                    </div>
                                    {/* <input type="text" className="form-control" placeholder="ID Product"
                                    onChange={e => setProduct({...product ,id : e.target.value})} value={product.id}></input> */}
                                    <input list="cate" className="form-control" placeholder="ID Product" type="text"
                                        onChange={e => {
                                            setProduct({...product ,id : e.target.value })
                                            setSearch({...search , bool : true , name : "product" , string : e.target.value})
                                            }}></input>
                                    <datalist id="cate">
                                        {listProductInput.map((category) => (
                                           <option value={category.id} key={category.id}>{category.name}</option>
                                        ))}
                                    </datalist>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="">Number Product</span>
                                    </div>
                                    

                                    <input type="text" className="form-control" placeholder="Number Product"
                                    onChange={e => setProduct({...product ,number : e.target.value})} value={product.number}></input>
                                    
                                    <div className="input-group-append">
                                        <button className="btn btn-info" type="button" onClick={addToListProduct}>Add</button>
                                    </div>
                                    
                                </div> 
                                <br/>
                                <label>List product</label>
                                
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Name Product</th>
                                                <th scope="col">Number Product</th>
                                                <th scope="col">Total Money</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {   
                                                invoice.listProduct.map((element) => (   

                                                    <tr key = {element.id}>
                                                        <td>{element.id}</td>
                                                        <td>{element.name_Product}</td>
                                                        <td>{element.number_Product}</td>
                                                        <td>{element.totalMoney} VND</td>
                                                    </tr>
                                            ))}
                                            <tr>

                                                <td colSpan="3"></td>
                                                <td>Total Money: {invoice.totalMoney} VND</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                                    
                            </div>
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn btn-success" onClick={addInvoice}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default  NewInvoice