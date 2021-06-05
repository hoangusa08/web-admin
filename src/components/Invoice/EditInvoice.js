import React, { useState, useEffect, useContext } from 'react'
import API from '../Config/Api'
import { useHistory } from 'react-router';
import {LoginContext} from '../Context/LoginContext'
import { success } from '../Helper/Notification';
function EditInvoice(props) {
    const check = useContext(LoginContext);
    const [invoice, setInvoice] = useState({
        name_Customer : "",
        listProduct: [],
        is_paid: false,
        totalMoney: 0
    });
    const history = useHistory();
    const id = props.match.params.id
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    var Data  = [
        {
            key: "Paid",
            value: true
        },
        {
            key: "UnPaid",
            value: false
        },
    ],

    MakeItem = function(X) {
        return <option value={X.value} selected= {X.value == invoice.is_paid ? "selected" : ""} >{X.key}</option>;
    };

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

    
    const changeIsPaid = (e) => {  
        e.persist();  
        setInvoice({...invoice, [e.target.name]: e.target.value});  
    }  
    const editIsPaid = (e) => {
        e.preventDefault();  
        const data = {
            is_paid: invoice.is_paid
        }
        console.log(data)

        API.patch('/invoice/' + id, data, token).then((response) => {
            console.log(response.data)
            history.push({
                pathname: '/invoice',
                
            }) 
            success('Invoice status has been updated successfully');
            
        }).catch((error) => {

        });
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
                                <label>Full Name Customer</label>
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

                                                    <tr key = {element.total_Money}>
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
                                {/* <input type="text" className="form-control" value={(invoice.is_paid) ? "Paid" : "UnPaid"} /> */}
                                <select className="form-control" name="is_paid" onChange={changeIsPaid}
                                > {Data.map(MakeItem)} </select>
                            </div>
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn btn-success" onClick={editIsPaid}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default  EditInvoice