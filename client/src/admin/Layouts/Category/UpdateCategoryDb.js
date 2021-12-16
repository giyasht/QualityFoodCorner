import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { isAuthenticated } from "../../../auth/index"
import { getCategoryByName, updateCategory } from "../../Helper/Category/index";
import AdminSideBar from '../../../components/AdminSideBar/AdminSideBar';

const UpdateCategoryDb = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        error: "",
        success: false
    });

    const {name, error, success} = values;

    const [updatedCategory, setupdatedCategory] = useState({
        updatedName: "",
        updatedError: "",
        updatedSuccess: false
    });

    const {updatedName, updatedError, updatedSuccess} = updatedCategory;


    const { user, token } = isAuthenticated();

    // category data is stored that admin wants to change
    const [data, setData] = useState(null);

    const handleChange = name => event => {  
        setValues({ ...values, error: false, [name]: event.target.value.toLowerCase() });
    };

    const handleChangeUpdatedValues = name => event => {  
        setupdatedCategory({ ...updatedCategory, updatedError: false, [name]: event.target.value.toLowerCase() });
    };

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values, error: false });

            const category = await getCategoryByName(name);

            console.log(category);

            setData(category);

            if (category.error) {
                setValues({ ...values, error: category.error, success:false })
            }else{
                setValues({ ...values, error:'', success:true });
            }
                
        } catch (error) {
            console.log("Error in Searching category...");
        }
    };

    const SearchCategoryDatabaseForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <h1>Search Category</h1>
                    <form>
                        <div className="form-group">
                            <label className="form-control-label">Search Category by name</label>
                            <input className="form-control" type="text" onChange={handleChange('name')} value={name} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-primary" >Search</button>
                    </form>
                </div>
            </div>
        )
    }


    const updateCategoryOnSubmit = async (event) => {

        try {

            event.preventDefault();

            setupdatedCategory({ ...updatedCategory, updatedError: false });
            
            console.log(user._id);
            console.log(token);
            console.log(data._id);
            console.log(updatedName);

            const res = await updateCategory(user._id, token, data._id, { ...updatedCategory });

            if (res.error) {
                setupdatedCategory({ ...updatedCategory, updatedError: res.error, updatedSuccess:false })
            }else{
                setupdatedCategory({ ...updatedCategory, updatedName:'', updatedError:'', updatedSuccess:true });
                navigate('/admin/dashboard');
            }
            
        } catch (error) {
            console.log("Error in Updating category...");
        }

    }

    const UpdateCategoryDatabaseForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <h1>Update Category</h1>
                    <form>
                        <div className="form-group">
                            <label className="form-control-label">Update Category</label>
                            <input className="form-control" type="text" onChange={handleChangeUpdatedValues('updatedName')} value={updatedName} />
                        </div>
                        <button onClick={updateCategoryOnSubmit} className="btn btn-primary" >Update</button>
                    </form>
                </div>
            </div>
        )
    }

    // Error Messages
    useEffect(() => {

        // Error in Searching Category
        if (error){
            Swal.fire({
                title: 'Admin !',
                icon: 'error',
                text: error,
            })
        }

        if (updatedError){
            Swal.fire({
                title: 'Admin !',
                icon: 'error',
                text: updatedError,
            })
        }
    }, [error, updatedError])

    // Success Messages
    useEffect(()=>{
        // Success in Searching Category
        if (success){
            Swal.fire({
                title: 'Admin !',
                icon: 'success',
                text: 'Category Found Admin can update now !',
            })
        }

        // Success in Updating Category Name
        if (updatedSuccess){
            Swal.fire({
                title: 'Admin !',
                icon: 'success',
                text: 'Category Name Updated Successfully !',
            })
        }
    },[success, updatedSuccess ])


    return (
        <>
            <div style={{overflow:"hidden"}}>
                <AdminSideBar/>

                {
                    SearchCategoryDatabaseForm()
                }

                {
                    !success ? 
                                <>
                                </>
                              :  
                                (
                                    <>
                                        <div>
                                            {UpdateCategoryDatabaseForm ()}
                                        </div>
                                    </>
                                )
                }
            </div>
        </>
    )
}

export default UpdateCategoryDb;
