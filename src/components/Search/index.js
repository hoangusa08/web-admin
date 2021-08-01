import React, { useRef, useState } from 'react'
import Api from '../Config/Api';

export default function Search(props) {
    const {token , setList ,toggle , settoggle , endpoint} = props
    const [searchValue, setsearchValue] = useState("")
    const typingTimeoutref = useRef(null)
   
    const [listSearch, setlistSearch] = useState([]);

    function handleOnchangeSearch(value) {
        setsearchValue(value)
        if(typingTimeoutref.current){
            clearTimeout(typingTimeoutref.current);
        }
        typingTimeoutref.current = setTimeout(() => {
            Api.get(`${endpoint}?search=${value}`, token).then((response)=> {
                settoggle(true)
                setlistSearch(response.data.content);
            }).catch((error) =>{
            });
        } , 300)
    }

    function search (){
        if (searchValue !== "")
        Api.get(`${endpoint}?search=`+searchValue, token).then((response)=> {
            setList(response.data.content);
        }).catch((error) =>{
        }); 
        settoggle(false)
    }
    return (
        <div>
            <input placeholder="Search..." onChange={e =>handleOnchangeSearch(e.target.value)}
                value={searchValue}  className="input-search"></input>
            <button onClick={search}className="btn-search "><i  className="fa fa-search" aria-hidden="true"></i></button>
            { (listSearch && toggle) && (
                <ul>
                    {
                        listSearch.map((p) =>(
                            <li onClick={()=>setsearchValue(p.name ? p.name : (p.userName ? p.userName : (p.content ? p.content : p.nameCustomer)))}>{p.name ? p.name : (p.userName ? p.userName : (p.content ? p.content : p.nameCustomer))}</li>
                        ))
                    }
                </ul>
            )}
        </div>
    )
}
