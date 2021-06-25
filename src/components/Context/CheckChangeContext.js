import React , {createContext , useState} from 'react';
import {useHistory} from 'react-router-dom'
export const CheckChangeContext = createContext();

const CheckChangeContextProvider = ({children}) =>{
    const [isChange , setIsChange] = useState(false);
    
    const changeStatusInvoice = () => {
        setIsChange(!isChange);
    }

    //context data
    const checkChangeContextData = {
        isChange :  isChange ,
        changeStatusInvoice
    }
    
    //return provider
    return(
        <CheckChangeContext.Provider value={checkChangeContextData}>
            {children}
        </CheckChangeContext.Provider>
    )

}
export default CheckChangeContextProvider;
