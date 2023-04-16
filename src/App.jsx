import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';
import ProtectedData from './Components/ProtectedData/ProtectedData';
import ItemDetails from './Components/ItemDetails/ItemDetails';
function App() {

  const [userData, setuserData] = useState(null)
useEffect(()=>{
  if(localStorage.getItem("userToken")!= null){
    saveData()
  }
},[])
  function saveData(){
    let encode= localStorage.getItem("userToken");
    let decode= jwtDecode(encode);
    setuserData(decode);
  }
let routers = createBrowserRouter([
  { path: "", element: <Layout setuserData={setuserData} userData={userData}/> , children: [
    {path:"home" , element: <ProtectedData><Home/></ProtectedData> },
    {path:"movies" , element: <ProtectedData><Movies/></ProtectedData>},
    {path:"tvshow" , element: <ProtectedData><Tvshow/></ProtectedData>},
    {path:"people" , element: <ProtectedData><People/></ProtectedData>},
    {path:"itemsDetails/:id/:type" , element: <ProtectedData><ItemDetails/></ProtectedData>},
    {path:"login" , element: <Login saveData={saveData}/>},
    {index:true , element: <Register/>},
    {path:"*" , element: <Notfound/>},
  ]}
])


  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
