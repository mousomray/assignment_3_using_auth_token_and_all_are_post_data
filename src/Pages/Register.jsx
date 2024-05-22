import React, { useState } from 'react'
import Layout from '../Common/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const initialstate = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    profile_pic: ''

}

const Register = () => {

    const [reg, setReg] = useState(initialstate)
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setReg({ ...reg, [name]: value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const apiurl = 'https://wtsacademy.dedicateddevelopers.us/api/user/signup'

            let formdata = new FormData();
            formdata.append("first_name", reg.first_name);
            formdata.append("last_name", reg.last_name);
            formdata.append("email", reg.email);
            formdata.append("password", reg.password);
            formdata.append("profile_pic", image);

            const response = await axios.post(apiurl, formdata)
            if (response && response?.data?.status === 200) {
                console.log("Register data is fetching", response);
                toast.success(response?.data?.message)
                navigate("/login")
                setLoading(false)
            } else {
                console.log("Data is Not Fetching", response);
                toast.error(response?.data?.message)
                setLoading(false)
            }
        } catch (error) {
            console.log("Error Fetching reg data", error);
            toast.error(error?.response?.data?.message)
            setLoading(false)
        }
    }

    return (
        <>
            <Layout>
                <form method='post' onSubmit={handleOnSubmit}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">First Name</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='first_name' value={reg.first_name} onChange={handleOnChange} />

                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Last Name</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='last_name' value={reg.last_name} onChange={handleOnChange} />

                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={reg.email} onChange={handleOnChange} />

                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={reg.password} onChange={handleOnChange} />
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
                        {loading?'Loading...':'Register'}
                    </button>
                </form>
            </Layout>
        </>
    )
}

export default Register
