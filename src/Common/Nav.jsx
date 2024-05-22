import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/Myauth'
import { toast } from 'react-toastify'

const Nav = () => {

    const [auth, setAuth] = useAuth() // Create custom hook

    // Make handle for Logout 
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth')
        toast.success('Successfully logout')
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/addproduct">Add product</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/showproduct">Showproduct</Link>
                        </li>
                        {
                            !auth.user ? (
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li class="nav-item">
                                        <Link onClick={handleLogout} class="nav-link" to="/login">Logout </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Nav
