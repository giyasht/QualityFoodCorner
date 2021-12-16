import React from 'react'
import { NavLink } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const AdminSideBar = () => {
    return (
        <ProSidebar style={{  float:"left" , height:"100vh !important"}}>
            <Menu iconShape="square" style={{height: "100vh"}}>
                <MenuItem>
                    <NavLink to="/">Home</NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
                </MenuItem>
                <SubMenu title="Category">
                    <MenuItem>
                        <NavLink to="/admin/create/category"><i className="fas fa-search"></i>Create Category</NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/admin/update/category"><i className="fas fa-search"></i>Update Category</NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/admin/delete/category"><i className="fas fa-search"></i>Delete Category</NavLink>
                    </MenuItem>
                </SubMenu>

                <SubMenu title="Product">
                    <MenuItem>
                        <NavLink to="/admin/create/product"><i className="fas fa-search"></i>Create Product</NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/admin/update/product"><i className="fas fa-search"></i>Update Product</NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/admin/delete/product"><i className="fas fa-search"></i>Delete Product</NavLink>
                    </MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
    )
}

export default AdminSideBar;
