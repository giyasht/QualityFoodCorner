import React from 'react'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import admin from './admin.svg'

const AdminDashboard = () => {
    return (
        <>
            <div style={{display:"flex"}}>
                <div>
                    <AdminSideBar/>
                </div>
                <div style={{height:"100vh" , width:"100%" , backgroundSize:"cover", backgroundColor:"rgb(232,248,255)"}}>
                    <img src={admin} alt="" style={{position: "relative", width: "100%", height: "100%"}}/>
                </div>
                
            </div>
        </>
    )
}

export default AdminDashboard;


