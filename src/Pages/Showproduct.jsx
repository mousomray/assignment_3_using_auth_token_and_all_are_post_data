import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import axios from 'axios';
import { useAuth } from '../Context/Myauth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Showproduct = () => {

    const [pro, setPro] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();

    const getData = async () => {

        try {
            const apiurl = 'https://wtsacademy.dedicateddevelopers.us/api/product/list'

            // Store token in a variable 
            const mytoken = {
                headers: {
                    "x-access-token": auth.token,
                },
            };

            const response = await axios.post(apiurl, pro, mytoken) // It is a post data so all process will be like post data
            console.log("Fetching data", response);
            setPro(response?.data?.data)
            setLoading(false);
        } catch (error) {
            console.log("Error Fetching Data", error);
            setLoading(false);
        }
    }
    useEffect(() => {
        getData()
    }, [])

    if (loading) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%' }}>Loading ...</h1>
    }

    //Create a function for delete using post data

    const deleteUserData = async (id) => {
        try {

            const apiurl = 'https://wtsacademy.dedicateddevelopers.us/api/product/remove'

            // Store token in a variable 
            const mytoken = {
                headers: {
                    "x-access-token": auth.token,
                },
            };

            const response = await axios.post(apiurl, { id }, mytoken); // It is a post Data so I take id in an object not take in ${id}

            console.log("Delete Data is Fetching:", response);
            getData(); // Refresh data
            toast.warn(response?.data?.message);
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error(error?.response?.data?.message);
        }
    };



    return (
        <>
            <Layout>
                <div className='container' style={{ marginTop: '100px' }}>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Image</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pro?.slice(0, pro.length)?.reverse()?.map((value) => {
                                return (
                                    <>
                                        <tr>

                                            <td>{value?.title}</td>
                                            <td>{value?.description}</td>
                                            <td><img
                                                src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${value?.image}`}
                                                style={{ height: "150px", width: "200px" }}
                                                alt="image"

                                            /></td>
                                            <td><Link to={`/edit/${value._id}`}><button type="button" class="btn btn-primary">Edit</button></Link></td>
                                            <td><button type="button" class="btn btn-danger" onClick={() => deleteUserData(value?._id)}>Delete</button></td>
                                        </tr>

                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </Layout>
        </>
    )
}

export default Showproduct
