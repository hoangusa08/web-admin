import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import API from '../Config/Api'
import { useHistory } from 'react-router';
import {LoginContext} from '../Context/LoginContext'
function ViewInvoice(props) {
    const check = useContext(LoginContext);
    const [invoice, setInvoice] = useState({
        id: -1,
        name_Customer : "",
        listProduct: [],
        is_paid: false,
        totalMoney: 0
    });
    const history=useHistory();
    const id = props.match.params.id
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    useEffect(() => {
        check.checklogin();
        API.get('/invoice/ByCustomer/all', token).then((response)=> {
            console.log(response.data)
            let listInvoice = response.data
            //table sau khi xu ly
            let listInvoiceHandled = [];

            listInvoice.forEach(element => {
                if (element.id == id){
                    listInvoiceHandled.push(element)
                    // console.log(element)
                }
                
            });
            
            // list product of invoice
            let listProductOfInvoice = []
            let totalMoney = 0
            listInvoiceHandled.forEach(element => {
                const product = {
                    name_Product: element.name_Product,
                    number_Product: element.number_Product,
                    total_Money: element.total_Money
                }
                totalMoney += element.total_Money
                listProductOfInvoice.push(product)
            });
            
            //invoice
            let dataInvoice = {
                id: listInvoiceHandled[0].id,
                name_Customer : listInvoiceHandled[0].name_Customer,
                listProduct: listProductOfInvoice,
                is_paid: listInvoiceHandled[0].is_paid ,
                totalMoney: totalMoney
            }
            console.log(dataInvoice)

            setInvoice(dataInvoice)
            // console.log(dataInvoice)
            // console.log(invoice.id)
        }).catch((error) =>{
        });
    }, []);

          
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
                        <h4 className="card-title">View Invoice</h4>
                        <form className="form-horizontal m-t-30" >
                            <div className="form-group" >
                                <label>Name Customer</label>
                                <input type="text" className="form-control" value={invoice.name_Customer} readOnly/>
                                    
                            </div>
                            <div className="form-group" >
                                <label>List product</label>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name Product</th>
                                                <th scope="col">Number Product</th>
                                                <th scope="col">Total Money</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {   
                                                invoice.listProduct.map((element) => (                                                
                                                    <tr>
                                                        <td>{element.name_Product}</td>
                                                        <td>{element.number_Product}</td>
                                                        <td>{element.total_Money} VND</td>
                                                </tr>
                                            ))}
                                            <tr>

                                                <td colSpan="2"></td>
                                                <td>Money: {invoice.totalMoney} VND</td>
                                        </tr>
                                        </tbody>
                                    </table>
                            </div>
                                    
                            </div>
                            <div className="form-group" >
                                <label>Status</label>
                                <input type="text" className="form-control" value={(invoice.id_paid) ? "Paid" : "UnPaid"} disabled/>
                                    
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default  ViewInvoice