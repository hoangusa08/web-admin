import React, {  useContext, useEffect} from 'react';
import { Link} from 'react-router-dom';
import {LoginContext} from '../Context/LoginContext'
import {Dropdown } from 'react-bootstrap'
import { useHistory} from 'react-router-dom'
function Header() {
    const history = useHistory()
    const login = useContext(LoginContext);
    var fullname = login.Fullname;
    useEffect(() => {
        login.checklogin();
    }, [fullname])
    const LogoutHandle = () =>{
        login.LogoutDispatch();
    }
    const Account = () =>{
        history.push(`/myaccount`)
    }
    return (
        <div className="topbar" data-navbarbg="skin6">
            <nav className="navbar top-navbar navbar-expand-md navbar-light">
                <div className="navbar-header" data-logobg="skin5">
                    <div className="navbar-brand">
                        <Link to="/">
                                <h1>E STORE</h1>
                        </Link>
                    </div>
                </div>
                <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin6">

                    <ul className="navbar-nav float-left mr-auto">

                        <li className="nav-item search-box">
                            <a className="nav-link waves-effect waves-dark" href="a">
                                <div className="d-flex align-items-center">
                                    <i className="mdi mdi-magnify font-20 mr-1"></i>
                                    <div className="ml-1 d-none d-sm-block">
                                        <span>Search</span>
                                    </div>
                                </div>
                            </a>
                            <div className="form app-search position-absolute">
                                <input type="text" className="form-control" placeholder="Search &amp; enter"></input>
                                <a className="srh-btn">
                                    <i className="ti-close"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                    { login.IsLogin ? (
                        <ul className="navbar-nav float-right">
                            <li className="nav-item dropdown">    
                                <Dropdown >
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: '#2d3e55'}}>
                                        Welcome : {fullname}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={LogoutHandle}  >Logout</Dropdown.Item>
                                        {localStorage.getItem("roleNames")==="employee" &&<Dropdown.Item onClick={Account}  >Account</Dropdown.Item>}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul> ) : (
                        <ul className="navbar-nav float-right">
                            <li className="nav-item dropdown">    
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </div>
    )
}
export default Header