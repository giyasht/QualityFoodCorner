import React from 'react'
import { Route } from 'react-router-dom';
import AdminRouteProtect from './AdminRouteProtect';
import AdminDashboard from './../admin/Layouts/AdminDashboard/AdminDashboard';
import AddCategoryDb from '../admin/Layouts/Category/AddCategoryDb';
import UpdateCategoryDb from '../admin/Layouts/Category/UpdateCategoryDb';
import AddProductDb from '../admin/Layouts/Product/AddProductDb'; 
import CreateOffer from '../admin/Layouts/Offer/CreateOffer';
import CreateDeveloper from '../admin/Layouts/Developer/CreateDeveloper';
import CreateStore from '../admin/Layouts/Store/CreateStore';
import ListAllCategories from '../admin/Layouts/Category/ListAllCategories';
import ListAllProducts from '../admin/Layouts/Product/ListAllProducts';
import ListAllStore from '../admin/Layouts/Store/ListAllStore';
import ListAllOffers from '../admin/Layouts/Offer/ListAllOffers';
import ListAllDeveloper from '../admin/Layouts/Developer/ListAllDeveloper';

const AdminRoutes = [

    // Admin DashBoard
    <Route exact path='/admin/dashboard' element={ <AdminRouteProtect><AdminDashboard /></AdminRouteProtect> } key="admin-dashboard" />,

    // Admin - Offer (Get All)
    <Route exact path='/admin/all/offer' element={ <AdminRouteProtect><ListAllOffers /></AdminRouteProtect> } key="admin-all-offer" />,

    // Admin - Add Offer
    <Route exact path='/admin/create/offer' element={ <AdminRouteProtect><CreateOffer /></AdminRouteProtect> } key="admin-create-offer" />,

    // Admin - Developer (Get All)
    <Route exact path='/admin/all/developer' element={ <AdminRouteProtect><ListAllDeveloper /></AdminRouteProtect> } key="admin-create-developer" />,

    // Admin - Add Developer
    <Route exact path='/admin/create/developer' element={ <AdminRouteProtect><CreateDeveloper /></AdminRouteProtect> } key="admin-create-developer" />,
    
    // Admin - Store (Get All)
    <Route exact path='/admin/all/stores' element={ <AdminRouteProtect><ListAllStore /></AdminRouteProtect> } key="admin-all-store" />,

    // Admin - Add Store
    <Route exact path='/admin/create/store' element={ <AdminRouteProtect><CreateStore /></AdminRouteProtect> } key="admin-create-store" />,

    // Admin - Category (Get All)
    <Route exact path='/admin/all/categories' element={ <AdminRouteProtect><ListAllCategories /></AdminRouteProtect> } key="admin-all-category" />,

    // Admin - Category (Create)
    <Route exact path='/admin/create/category' element={ <AdminRouteProtect><AddCategoryDb /></AdminRouteProtect> } key="admin-create-category" />,
    
    // Admin - Category (Update)
    <Route exact path='/admin/update/category' element={ <AdminRouteProtect><UpdateCategoryDb /></AdminRouteProtect> } key="admin-update-category" />,

    // Admin - Product (Get All)
    <Route exact path='/admin/all/products/:limit' element={ <AdminRouteProtect> <ListAllProducts /></AdminRouteProtect> } key="admin-all-product" />,

    // Admin - Product (Create)
    <Route exact path='/admin/create/product' element={ <AdminRouteProtect> <AddProductDb /></AdminRouteProtect> } key="admin-create-product" />,
];

export default AdminRoutes;