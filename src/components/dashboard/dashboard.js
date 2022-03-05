import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


const Dashboard = () => {

    const history = useNavigate()
    const [quote, setQuote ] = useState('')

    async function populateQuote() {
        const req = await fetch('http://localhost:1337/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
        const data = req.json()

        if(data.status === 'ok'){
            setQuote(data.quote)
        }
        else{
            alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                history.replace('/signin')
            } else {
                populateQuote()
            }
        }
    }, [])


    return (
        <div>
            <h1 className="text-2xl tracking-wider">Your Quote: {quote || 'No quote found'}</h1>
        </div>
    )
};

export default Dashboard;