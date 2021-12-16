import React from 'react'
import { Route } from 'react-router-dom';
import AdminRouteProtect from './AdminRouteProtect';
import AdminDashboard from '../layouts/AdminDashboard/AdminDashboard';
import AddCategoryDb from '../admin/Layouts/Category/AddCategoryDb';
import UpdateCategoryDb from '../admin/Layouts/Category/UpdateCategoryDb';

import AddProductDb from '../admin/Layouts/Product/AddProductDb'; 

const AdminRoutes = [

    // Admin DashBoard
    <Route exact path='/admin/dashboard' element={ <AdminRouteProtect><AdminDashboard /></AdminRouteProtect> } key="admin-dashboard" />,

    // Admin - Category
    <Route exact path='/admin/create/category' element={ <AdminRouteProtect><AddCategoryDb /></AdminRouteProtect> } key="admin-create-category" />,
    <Route exact path='/admin/update/category' element={ <AdminRouteProtect><UpdateCategoryDb /></AdminRouteProtect> } key="admin-update-category" />,

    // Admin - Product
    <Route exact path='/admin/create/product' element={ <AdminRouteProtect> <AddProductDb /></AdminRouteProtect> } key="admin-create-product" />
];

export default AdminRoutes;