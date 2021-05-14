import React, { Component } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
class Home extends Component{
   
    render(){
        return (
            <div>
                <Header></Header>
                <Sidebar></Sidebar>
            </div>
        )
    }
}

export default Home