import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from '../Common/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/Myauth';

const initialstate = {
    email: '',
    password: ''
}

const Login = () => {

    const [login, setLogin] = useState(initialstate);
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useAuth(); // Custom Hook  
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setLogin({ ...login, [name]: value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const apiurl = 'https://wtsacademy.dedicateddevelopers.us/api/user/signin'

            const response = await axios.post(apiurl, login)
            if (response && response?.data?.status === 200) {
                console.log("Login is Fetching", response);
                toast.success(response?.data?.message)
                
                // Auth area Start 
                setAuth({
                    ...auth,
                    user: response.data.data, // I use data.data because there is present data not user
                    token: response.data.token
                });
                localStorage.setItem("auth", JSON.stringify(response?.data))
                // Auth End 

                setLoading(false)
                navigate("/")
            } else {
                console.log("Login not Possible", response);
                toast.error(response?.data?.message)
                setLoading(false)
            }
        } catch (error) {
            console.log("Error fetching data", error);
            setLoading(false)
        }
    }

    return (
        <>
            <Layout>
                <form method='post' onSubmit={handleOnSubmit}>


                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={login.email} onChange={handleOnChange} />

                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={login.password} onChange={handleOnChange} />
                    </div>

                    <button type="submit" class="btn btn-primary">
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                    <Link to="/register"><p>You have a account? Register now</p></Link>
                </form>
            </Layout>
        </>
    )
}

export default Login
