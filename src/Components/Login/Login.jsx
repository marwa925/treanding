import { useFormik } from 'formik';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';

export default function Login({saveData}) {
  let navegate= useNavigate();
  let [erro,setErro]= useState("");
  let [loading,setLoding]= useState(false);
  let validationSchema= Yup.object({
      email:Yup.string().required('email is required').email('enter valid email'),
      password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9!@#$%*&-_]{5,10}$/,'should start with capital letter'),
        })
  let formik= useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    onSubmit:(values)=>{
      getData(values);
    },
    validationSchema
  })
  async function getData(val){
      
    setLoding(true);
    let {data}= await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',val).catch((err)=>{
      console.log(err.response.data.message)
      setErro(err.response.data.message);
      setLoding(false);
    });
    setLoding(false);
    if(data.message =='success'){
      localStorage.setItem("userToken",data.token);
      saveData();
      navegate("/home")
    }
  }
  return (
    <div className='w-75 mx-auto '>
      <h2>Login Now</h2>
      <form onSubmit={formik.handleSubmit}>
      
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
      {erro != ""?<div className='alert alert-danger my-2'>{erro}</div>:""}
      {loading?<button type='button' className='btn btn-info'>
        <i className='fa-solid fa-spinner fa-spin text-white'></i>
      </button>:<button disabled={!formik.isValid} type= "submit" className='btn btn-info'>Login</button>}
      
      
      </form>
      
    </div>
  )
}
