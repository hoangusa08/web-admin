import React, { useState ,useContext, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {LoginContext} from '../Context/LoginContext'
import API from '../Config/Api';
import { CheckChangeContext } from '../Context/CheckChangeContext';
function Sidebar() {
    let token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    const [countInvoiceUnPaid, setCountInvoiceUnPaid] = useState(0);
    const  check = useContext(LoginContext);
    const checkStatusInvoice = useContext(CheckChangeContext);

    useEffect(() => {
        check.checklogin();
    }, [check.Fullname]);

    useEffect(() => {
        check.checklogin();
        let roleName = localStorage.getItem("roleNames")
        const apiUrl = '/invoice/ByCustomer/all'
        let count = 0
        if (roleName === "employee") {
            API.get(apiUrl,token).then((response)=> {   
                let dataInvoice = response.data
                let listIdInvoice = [] 
                dataInvoice.forEach(element => {
                    if (listIdInvoice.includes(element.id)) {
                        return;
                    } 
                    listIdInvoice.push(element.id)
                    if (element.is_paid == false) {
                        count++;
                    }
                });
                setCountInvoiceUnPaid(count)
                
            }).catch((error) =>{
            });
        }
    }, [checkStatusInvoice.isChange]);

    return (
        <div className="left-sidebar" data-sidebarbg="skin5">
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    {(check.IsLogin === false ) ? (
                        <ul id="sidebarnav">
                            <li className="sidebar-item">
                                <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/login" aria-expanded="false"
                                activeStyle={{
                                   color : 'while'
                                }} exact>
                                  
                                   <i className="mdi  mdi-login-variant"></i>
                                    <span className="hide-menu">Login</span>
                                </NavLink>
                            </li> 
                        </ul>
                        ) : ( 
                            (check.Employer === "employee") ? (
                                <ul id="sidebarnav">
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/products" aria-expanded="false"
                                        activeStyle={{
                                            color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-reproduction"></i>
                                            <span className="hide-menu">Products</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/brands" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-format-wrap-inline"></i>
                                            <span className="hide-menu">Brand</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/categorys" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-fridge-filled-bottom"></i>
                                            <span className="hide-menu">Category</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/image" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-file-image"></i>
                                            <span className="hide-menu">Image</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/color" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-format-color-fill"></i>
                                            <span className="hide-menu">Color</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/posts" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-calendar-text"></i>
                                            <span className="hide-menu">Post</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/reviews" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-more"></i>
                                            <span className="hide-menu">Reviews</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item ">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link header__cart-wrap" to="/invoice" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while',
                                           position: 'relative',
                                        }} exact>
                                            <i className="mdi mdi-select-inverse"></i>
                                            <span className="hide-menu">Invoice</span>
                                            <span className="header__cart-notice">{countInvoiceUnPaid}</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/customer" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-human"></i>
                                            <span className="hide-menu">Customer</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            ) : (
                                <ul id="sidebarnav">
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/Sale" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-sale"></i>
                                            <span className="hide-menu">Sale</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/role" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-xbox-controller"></i>
                                            <span className="hide-menu">Roles</span>
                                        </NavLink>
                                    </li>
                                    <li className="sidebar-item">
                                        <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to="/employee" aria-expanded="false"
                                        activeStyle={{
                                           color : 'while'
                                        }} exact>
                                            <i className="mdi mdi-human"></i>
                                            <span className="hide-menu">Employee</span>
                                        </NavLink>
                                    </li>
                                </ul> 
                            )
                       
                        )}                 
                </nav>
            </div>
        </div> 
    )
}

export default Sidebar