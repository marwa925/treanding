import { useFormik } from 'formik';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup'; 
export default function Register() {
  let navegate= useNavigate();
  let [erro,setErro]= useState("");
  let [loading,setLoding]= useState(false);
  let validationSchema= Yup.object({
      name:Yup.string().required("name is required").min(3,'minimum 3 letter').max(15,'maximum 15 letter'),
      email:Yup.string().required('email is required').email('enter valid email'),
      password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9!@#$%*&-_]{5,10}$/,'should start with capital letter'),
      rePassword:Yup.string().required("repassword is required").oneOf([Yup.ref('password')],'repassword not match'),
      phone:Yup.string().required('phone is required').matches(/^(010|011|012|015)[0-9]{8}$/,'phone is invalid')
  })
  let formik= useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    onSubmit:(values)=>{
      getData(values);
    },
    validationSchema
  })
  async function getData(val){
      
    setLoding(true);
    let {data}= await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',val).catch((err)=>{
      console.log(err.response.data.message)
      setErro(err.response.data.message);
      setLoding(false);
    });
    setLoding(false);
    console.log(data);
    if(data.message =='success'){
      navegate("/login")
    }
  }
  return (
    <div className='w-75 mx-auto '>
      <h2>Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
      <div className='my-2'>
        <label htmlFor="name">Name :</label>
        <input onChange={formik.handleChange} type="text" id='name' name="name" className='form-control w-100 ' />
        <p className='text-danger'>{formik.errors.name}</p>
        {/* {formik.errors.name && formik.touched.name?<div className='alert alert-danger my-2'>{formik.errors.name}</div>:""} */}

      </div>
      <div className='my-2'>
        <label htmlFor="email">Email :</label>
        <input onChange={formik.handleChange} type="email" id='email' name="email" className='form-control w-100 ' />
        <p className='text-danger'>{formik.errors.email}</p>      
      </div>
      <div className='my-2'>
        <label htmlFor="password">Password :</label>
        <input onChange={formik.handleChange} type="password" id='password' name="password" className='form-control w-100 ' />
        <p className='text-danger'>{formik.errors.password}</p>      
      </div>
      <div className='my-2'>
        <label htmlFor="rePassword">rePassword :</label>
        <input onChange={formik.handleChange} type="password" id='rePassword' name="rePassword" className='form-control w-100 ' />
        <p className='text-danger'>{formik.errors.rePassword}</p>      
      </div>
      <div className='my-2'>
        <label htmlFor="phone">Phone :</label>
        <input onChange={formik.handleChange} type="tel" id='phone' name="phone" className='form-control w-100 ' />
        <p className='text-danger'>{formik.errors.phone}</p>      
      </div>
      {erro != ""?<div className='alert alert-danger my-2'>{erro}</div>:""}
      {loading?<button type='button' className='btn btn-info'>
        <i className='fa-solid fa-spinner fa-spin text-white'></i>
      </button>:<button disabled={!formik.isValid} type= "submit" className='btn btn-info'>Register</button>}
      
      
      </form>
      
    </div>
  )
}
