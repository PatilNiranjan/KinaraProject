import { useEffect, useState } from "react";

function Fetch()
{
    let [data,setData]=useState(null);
    let [page,setPage]=useState(0);
    let [size,setSize]=useState(10);

    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("pagenum", page);
        myHeaders.append("pagesize", size);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/getStudentBypagination", requestOptions)
        .then(response => response.json())
        .then((result) =>{
            setData(result.content); 
        })
        .catch(error => console.log('error', error));
    },[page,size])

    return ( 
        <div className="Stu-Contain">
            <h1>Student Details</h1>
            
            <div className="Stu-Header">
                <div>
                    <h3> Id </h3>
                </div>
                <div>
                    <h3> Name </h3>
                </div>
                <div>
                    <h3> Marks </h3>
                </div>
                <div>
                    <h3> College </h3>
                </div>
            </div>
            
            {data && <div>
                {data.map((d)=>{ 
                                return <div className="Stu-Details">
                                            <div className="Stu-Id">
                                                <p>{d.sid}</p>
                                            </div>
                                            <div className="Stu-Name">
                                                <p>{d.sname}</p>
                                            </div>
                                            <div className="Stu-Marks">
                                                <p>{d.smarks}</p>
                                            </div>
                                            <div className="Stu-Clg">
                                                <p>{d.college}</p>
                                            </div>
                                       </div>
                                       })}
            </div>}

            <div className="Stu-Control">
                <div className="Custom-Page">
                    <p>Students per Page</p>
                    <select className="Pagesize" onChange={(e)=>{setSize(e.target.value)}}>
                        <option>--size--</option>
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                        <option>100</option>
                    </select>
                </div>
                <div className="Custom-Page">
                    <h4>1 - 100</h4>
                    <button onClick={()=>{setPage(page-1)}}> <i class='bx bx-left-arrow-circle'></i> </button>
                    <button onClick={()=>{setPage(page+1)}}> <i class='bx bx-right-arrow-circle'></i> </button>
                </div>    
            </div>

    </div> );
}

export default Fetch;
