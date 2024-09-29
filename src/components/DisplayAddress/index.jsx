import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import Card from '../Card';
import "./index.css";
const DisplayAddress = (props) => {

    const dt = useLocation()
    const [arr, setArr] = useState([])
    const data = { id: dt.state.id }
    console.log("data...", data)
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    };


    useEffect(() => {
        axios.post(`http://localhost:3000/getAddress`, data, config)
            .then(async response => {
                setArr(response.data.data)
                console.log("respo...", arr);
            })
            .catch(error => {
                console.error('There was an error sending the data!', error);
            });
    }, [])




    return (
        <div className='arrange'>
            {
                arr.map(ele => <Card ele={ele} key={v4()} />)
            }
        </div>
    )
};



export default DisplayAddress