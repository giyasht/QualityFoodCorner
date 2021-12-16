import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../../auth';
import { addCategory } from '../../Helper/Category/index';
import AdminSideBar from '../../../components/AdminSideBar/AdminSideBar';

const AddCategoryDb = () => {

    const [values, setValues] = useState({
        name: "",
        error: "",
        success: false
    });

    const {name, error, success} = values;

    const { user, token } = isAuthenticated();

    const handleChange = name => event => {  
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = async (event) => {

        try {

            event.preventDefault();

            setValues({ ...values, error: false });

            const data = await addCategory( user._id, token, { name });

            if (data.error) {
                setValues({ ...values, error: data.error, success:false })
            }else{
                setValues({ ...values, name:'', error:'', success:true });
            }

                
        } catch (error) {
            console.log("Error in creating category...");
        }
    };

    const AddCategoryDatabaseForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <h1>Create Category</h1>
                    <form>
                        <div className="form-group">
                            <label className="form-control-label">Name of Category</label>
                            <input className="form-control" type="text" onChange={handleChange('name')} value={name} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-primary" >Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    // Error and Success Messages
    useEffect(() => {
        if (error){
            Swal.fire({
                title: 'Admin !',
                icon: 'error',
                text: error,
            })
        }
        if (success){
            Swal.fire({
                title: 'Admin !',
                icon: 'success',
                text: 'New Category created successfully...',
            })
        }
    }, [error, success])

    return (
        <>
            <div style={{overflow:"hidden"}}>
                <AdminSideBar/>
                {AddCategoryDatabaseForm()}
            </div>
        </>        
    )
}

export default AddCategoryDb;
