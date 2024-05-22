import React, { useState, useEffect } from 'react'
import Layout from '../Common/Layout'
import { useAuth } from '../Context/Myauth'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const initialstate = {
    title: '',
    description: '',
    image: ''
}

const Edit = () => {

    const [add, setAdd] = useState(initialstate)
    const [image, setImage] = useState(''); // For Image 
    const [auth] = useAuth(); // Custom Hook 
    const [loading, setLoading] = useState(false)
    const { id } = useParams(); // For Use Params 
    const navigate = useNavigate();
    const [error, setError] = useState({});

    // Functon for validation
    const validation = () => {
        let error = {}

        // For Title 
        if (!add.title) {
            error.title = "Title is Required"
        }

        // For Description
        if (!add.description) {
            error.description = "Description is Required"
        }

        return error
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setAdd({ ...add, [name]: value })

        // For title 
        if (name === 'title') {
            if (value.length === 0) {
                setError({ ...error, title: 'Title is Required' })
                setAdd({ ...add, title: '' })
            } else {
                setError({ ...error, title: '' })
                setAdd({ ...add, title: value })
            }
        }

        // For Description 
        if (name === 'description') {
            if (value.length === 0) {
                setError({ ...error, description: 'Description is Required' })
                setAdd({ ...add, description: '' })
            } else {
                setError({ ...error, description: '' })
                setAdd({ ...add, description: value })
            }
        }

    }

    // Function for fetch single data
    const getProduct = async () => {

        const singleAPI = `https://wtsacademy.dedicateddevelopers.us/api/product/detail/${id}`

        const myToken = {
            headers: {
                "x-access-token": auth.token,
            },
        }
        try {
            const response = await axios.get(singleAPI, myToken)
            const fitproduct = response?.data?.data;

            const reg = {
                title: fitproduct.title,
                description: fitproduct.description,
                image: fitproduct.image
            }

            setAdd(reg)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProduct();
    }, [id, auth.token]); // Pass Token here for Edit 



    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        let ErrorList = validation()
        setError(validation())

        if (Object.keys(ErrorList).length === 0) {
            const apiUrl = 'https://wtsacademy.dedicateddevelopers.us/api/product/update';

            // Store token in a variable 
            const mytoken = {
                headers: {
                    "x-access-token": auth.token,
                },
            };

            // Form Data Handling 
            const formData = new FormData();
            formData.append("id", id) // In this API, Id is required so you have to put id in formdata
            formData.append("title", add.title);
            formData.append("description", add.description);
            formData.append("image", image);

            try {
                const response = await axios.post(apiUrl, formData, mytoken);
                if (response && response?.data?.status === 200) {
                    navigate("/showproduct");
                    toast.success(response?.data?.message);
                    setLoading(false)
                } else {
                    toast.error(response?.data?.message)
                    setLoading(false)
                }
            } catch (error) {
                console.log("Error occurred:", error);
                toast.error(error?.response?.data?.message);
                setLoading(false)
            }
        } else {
            setLoading(false);
        }


    };

    return (
        <>
            <Layout>
                <form method='post' onSubmit={handleOnSubmit}>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Title</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='title' value={add.title} onChange={handleOnChange} />
                        <span style={{ display: 'block', color: 'red' }}>{error?.title}</span>

                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Description</label>
                        <input type="text" class="form-control" id="exampleInputPassword1" name='description' value={add.description} onChange={handleOnChange} />
                        <span style={{ display: 'block', color: 'red' }}>{error?.description}</span>
                    </div>
                    {/*This form section is for submit image*/}
                    <div className="form-group">
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            name="image"
                            accept="image/*"
                            class="form-control"
                        />
                        {image !== "" && image !== undefined && image !== null ? (
                            <img
                                style={{ height: "180px" }}

                                // createObjectURL use for make image url 
                                src={URL.createObjectURL(image)}
                                alt=""
                                className="upload-img"
                            />

                        ) : (
                            <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
                        )}
                    </div>
                    {/*Image area end*/}
                    <button type="submit" class="btn btn-primary">
                        {loading ? 'Loading...' : 'Edit'}
                    </button>
                </form>
            </Layout>
        </>
    )
}

export default Edit
