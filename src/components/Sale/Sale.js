import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import { Bar } from "react-chartjs-2";
import Api from '../Config/Api';
export default function Sale() {
    const [ListSale , setListSale] = useState([]);
    const [DataMonthly, setDataMonthly] = useState([])
    const [totalProduct, settotalProduct] = useState(0)
    const [totalUser, settotalUser] = useState(0)
    const check = useContext(LoginContext);
    useEffect(() => {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        check.checklogin();
        Api.get('saleFigureEmployee',token).then((response)=> {
            setListSale(response.data.content);
            }).catch((error) =>{
            });
        Api.get('saleFigure/getTotalProductSold',token).then((response)=> {
            settotalProduct(response.data);
            console.log(response.data);
            }).catch((error) =>{
            });
        Api.get('admin/user/getTotalCustomer',token).then((response)=> {
            settotalUser(response.data);
            console.log(response.data);
            }).catch((error) =>{
            });
        Api.get('saleFigure/ByMonth',token).then((response)=> {
            let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            response.data.content.forEach(function(item, index, array) {
                data[item.month -1] = item.total;
            })
            setDataMonthly(data)
        }).catch((error) =>{
        });
    }, [])
    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-5 align-self-center">
                        <h4 className="page-title">Dashboard</h4>
                    </div>
                    <div className="col-7 align-self-center">
                        <div className="d-flex align-items-center justify-content-end">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card ">
                            <div className="card-body cardinvoice">
                                <Bar
                                    data={{
                                    labels: [
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June", 
                                        "July",
                                        "August",
                                        "September",
                                        "October",
                                        "November",
                                        "December"
                                    ],
                                    datasets: [
                                        {
                                        label: "Monthly revenue (Billions USD)",
                                        backgroundColor: [
                                            "#c45851",
                                            "#c45852",
                                            "#c45853",
                                            "#c45854",
                                            "#c45855",
                                            "#c45856",
                                            "#c45857",
                                            "#c45858",
                                            "#c45859",
                                            "#c45860",
                                            "#c45861",
                                            "#c45862",
                                        ],
                                        data:  DataMonthly
                                        }
                                    ]
                                    }}
                                    options={{
                                    legend: { display: false },
                                    title: {
                                        display: true,
                                        text: "Predicted world population (millions) in 2050"
                                    }
                                    }}
                            
                                />
                                <div className="sales ct-charts mt-3"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title m-b-5">Products sold</h4>
                                <h2 className="font-light">{totalProduct}</h2>
                            </div>
                        </div>
                        <br></br>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title m-b-0"> Total Users</h4>
                                <h2 className="font-light">{totalUser}</h2>
                               
                            </div>
                        </div>
                        <br></br>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title m-b-5">Products sold</h4>
                                <h2 className="font-light">{totalProduct}</h2>
                                <h2 className="font-light">{totalProduct}</h2>
                                <h2 className="font-light">{totalProduct}</h2>
                              
                                <div className="m-t-20 text-center">
                                    <div id="earnings"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Latest Sales</h4>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th class="border-top-0">ID</th>
                                                <th class="border-top-0">NAME</th>
                                                <th class="border-top-0">MONTH</th>
                                                <th class="border-top-0">TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {ListSale.map((SALE) => (
                                            <tr> 
                                                <td class="txt-oflo">{SALE.id}</td>
                                                <td><span class="label label-success label-rounded">{SALE.fullName}</span> </td>
                                                <td class="txt-oflo">{SALE.month}</td>
                                                <td><span class="font-medium">{SALE.total}</span></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

