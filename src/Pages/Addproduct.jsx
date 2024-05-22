import React, { useState } from 'react'
import Layout from '../Common/Layout'
import { useAuth } from '../Context/Myauth'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const initialstate = {
    title: '',
    description: '',
    image: ''
}

const Addproduct = () => {

    const [add, setAdd] = useState(initialstate)
    const [image, setImage] = useState('');
    const [auth] = useAuth();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setAdd({ ...add, [name]: value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const apiurl = 'https://wtsacademy.dedicateddevelopers.us/api/product/create'

            // Store token in a variable 
            const mytoken = {
                headers: {
                    "x-access-token": auth.token,
                },
            };

            let formdata = new FormData();
            formdata.append("title", add.title);
            formdata.append("description", add.description);
            formdata.append("image", image);

            const response = await axios.post(apiurl, formdata, mytoken)
            if (response && response?.data?.status === 200) {
                console.log("Data is Fetching", response);
                toast.success(response?.data?.message)
                setLoading(false)
                navigate('/showproduct')
            }else{
                console.log("Error fetching data",response);
                toast.error(response?.data?.message)
                setLoading(false)
            }
        } catch (error) {
            console.log("Error Fetching Data", error);
            toast.error(error?.response?.data?.message)
            setLoading(false)
        }
    }

    return (
        <>
            <Layout>
                <form method='post' onSubmit={handleOnSubmit}>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Title</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='title' value={add.title} onChange={handleOnChange} />

                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Description</label>
                        <input type="text" class="form-control" id="exampleInputPassword1" name='description' value={add.description} onChange={handleOnChange} />
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
                        {loading ? 'Loading...' : 'Add product'}
                    </button>
                </form>
            </Layout>
        </>
    )
}

export default Addproduct
