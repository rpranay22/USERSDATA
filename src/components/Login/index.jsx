import axios from 'axios';

import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './index.css';
function Login(props) {
    const [uname, setUname] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [dfetch, setdfetch] = useState(false)
    const [userId, setUserId] = useState('')
    const navigate = useNavigate()
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    };

    let data = {}
    const handleSubmit = (e) => {
        e.preventDefault();
        data = {
            id: userId, uname: uname, name: name, address: address, date: new Date()
        };

        axios.post('https://usersdata-5.onrender.com/users', data, config)
            .then(async response => {
                console.log(response);
            })
            .catch(error => {
                console.error('There was an error sending the data!', error);
            });

        axios.post('https://usersdata-5.onrender.com/userdata', data, config)
            .then(async response => {
                console.log(response);

                setUname('');
                setAddress('')
                setName('')

                setdfetch(true);

            })
            .catch(error => {
                console.error('There was an error sending the data!', error);
            });
    };


    return (dfetch ? <Navigate to="/displayAddress" state={{ id: userId }} /> : ((<div className="App">
        <div className='center'>
            <form onSubmit={handleSubmit}>
                <div className='inp1'>
                    <label>
                        USERID
                    </label>
                    <input
                        type="number"
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        placeholder='USERID'
                        value={userId}
                    />
                </div>
                <div className='inp1'>
                    <label>
                        NAME
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='NAME'
                        value={name}
                    />
                </div>
                <div className='inp1'>
                    <label>
                        USERNAME
                    </label>
                    <input
                        type="text"
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                        required
                        placeholder='USERNAME'
                    />
                </div>
                <div className='inp1'>
                    <label>
                        ADDRESS
                    </label>
                    <input
                        value={address}
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder='ADDRESS'
                    />
                </div>
                <button type="submit" className='lbtn'>Register</button>

            </form>
        </div>
    </div >)
    ));
}

export default Login;