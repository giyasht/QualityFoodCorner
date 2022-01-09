import React, { useState, useEffect } from 'react'
import CategoryCard from './../../components/CategoryAdminCard/CategoryAdminCard'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import Loading from './../../../components/Loading/Loading'
const API = process.env.REACT_APP_BACKEND_API

const ListAllCategories = () => {

    const [categories, setCategories] = useState([]);
    const [length, setLength] = useState(0);
	const [isBusy, setBusy] = useState(true)

    useEffect(() => {

		const getAllCategories = async () => {

			try {

                const response = await fetch(`${API}/categories`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                })
        
                if (response) {
                    var data = await response.json();
                    setCategories(data);
                    setLength(data.length)
                    setBusy(false);
                }

			} catch (error) {
				return console.log(error);
			}
		}

		getAllCategories()

	}, [])

    function showCategories(start,end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<CategoryCard {...categories[i]} key={i}/>)
        }
        
        return elements;
    }

    return (
        <>
            <div style={{overflow:"hidden", display:"flex", backgroundColor:"var(--lightblack)"}}>
                <AdminSideBar/>
                <div className="bada">
                    <section>
                        <div className="container">
                            {
                                isBusy ? <Loading/> : showCategories(0,length)
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ListAllCategories
