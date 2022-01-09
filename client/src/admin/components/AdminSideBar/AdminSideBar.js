import React from 'react'
import { NavLink } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const AdminSideBar = () => {

    const navSlide = () => {
        const adminProsidebar = document.getElementsByClassName('admin_prosidebar')[0]
        
        if(adminProsidebar.style.display === ""){
            adminProsidebar.style.display = "none"
        }

        else{
            adminProsidebar.style.display = ""
        }
    }

    return (
        <>
            <div className="buttttt" style={{zIndex:"99"}}>
                <div className="toggle-buttonn" onClick={navSlide}>
                    <span className="bar-white"></span>
                    <span className="bar-white"></span>
                    <span className="bar-white"></span>
                </div>
            </div> 
            <ProSidebar className="admin_prosidebar">
                <NavLink to="/" style={{textDecoration: 'none'}} className="custom-card">
                    <div className="brand-title" data-aos="fade-right" data-aos-duration="1200">QFC</div>
                </NavLink>
                <Menu iconShape="square" style={{height: "100vh"}}>
                    
                    {/* <MenuItem>
                        <NavLink to="/">Home</NavLink>
                    </MenuItem> */}
                    
                    <MenuItem>
                        <NavLink className="nav-admin-link" style={{color:"lightgreen"}} to="/admin/dashboard"><b>Admin Dashboard</b></NavLink>
                    </MenuItem>
                    
                    <SubMenu title="Address">
                        <MenuItem>
                            <NavLink to="/add/address"><i className="fas fa-circle"></i>Add Address</NavLink>
                        </MenuItem>
                    </SubMenu>

                    <SubMenu title="Store">
                        <MenuItem>
                            <NavLink to="/admin/all/stores"><i className="fas fa-circle"></i>View All Stores</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="/admin/create/store"><i className="fas fa-circle"></i>Add New Store</NavLink>
                        </MenuItem>
                    </SubMenu>

                    <SubMenu title="Offer">
                        <MenuItem>
                            <NavLink to="/admin/all/offer"><i className="fas fa-circle"></i>View All Offers</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="/admin/create/offer"><i className="fas fa-circle"></i>Create New Offer</NavLink>
                        </MenuItem>
                    </SubMenu>

                    <SubMenu title="Developer">
                        <MenuItem>
                            <NavLink to="/admin/all/developer"><i className="fas fa-circle"></i>View All Developer</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="/admin/create/developer"><i className="fas fa-circle"></i>Create New Developer</NavLink>
                        </MenuItem>
                    </SubMenu>

                    <SubMenu title="Category">
                        <MenuItem>
                            <NavLink to="/admin/all/categories"><i className="fas fa-circle"></i>View All Categories</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="/admin/create/category"><i className="fas fa-circle"></i>Create Category</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="/admin/update/category"><i className="fas fa-circle"></i>Update Category</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="/admin/delete/category"><i className="fas fa-circle"></i>Delete Category</NavLink>
                        </MenuItem>
                    </SubMenu>

                    <SubMenu title="Product">
                        <MenuItem>
                            <NavLink to="/admin/all/products/6"><i className="fas fa-circle"></i>View All Products</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="/admin/create/product"><i className="fas fa-circle"></i>Create Product</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="/admin/update/product"><i className="fas fa-circle"></i>Update Product</NavLink>
                        </MenuItem>
                        <MenuItem>
                            <NavLink to="/admin/delete/product"><i className="fas fa-circle"></i>Delete Product</NavLink>
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>
        </>
    )
}

export default AdminSideBar;
