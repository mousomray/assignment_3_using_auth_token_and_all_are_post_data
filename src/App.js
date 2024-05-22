import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Pages/Register'
import Home from './Pages/Home'
import Login from './Pages/Login';
import { Navigate } from 'react-router-dom';
import Addproduct from './Pages/Addproduct';
import Showproduct from './Pages/Showproduct';
import Edit from './Pages/Edit';

const App = () => {

    // Create Function for private routing
    function PrivateRoute({ children }) {
        const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");
        return token !== null && token !== undefined ? (
            children
        ) : (
            <Navigate to="/login" />
        );
    }

    const public_routing = [
        {
            path: '/register',
            component: <Register />
        },
        {
            path: '/login',
            component: <Login />
        }
    ]

    const private_routing = [
        {
            path: '/',
            component: <Home />
        },
        {
            path: '/addproduct',
            component: <Addproduct />
        },
        {
            path: '/showproduct',
            component: <Showproduct />
        },
        {
            path: '/edit/:id',
            component: <Edit />
        }
    ]

    return (
        <>
            <ToastContainer />

            <Router>
                <Routes>
                    {public_routing.map((value) => {
                        return (
                            <>
                                <Route path={value?.path} element={value?.component} />
                            </>
                        )
                    })}

                    {private_routing.map((value) => {
                        return (
                            <>
                                <Route path={value?.path} element={<PrivateRoute>{value?.component}</PrivateRoute>} />
                            </>
                        )
                    })}
                </Routes>
            </Router>
        </>
    )
}

export default App
