import React, { useState, useEffect } from 'react'
import ProductAdminCard from './../../components/ProductAdminCard/ProductAdminCard'
import AdminSideBar from './../../components/AdminSideBar/AdminSideBar'
import Loading from './../../../components/Loading/Loading'
import { useParams } from 'react-router-dom'
const API = process.env.REACT_APP_BACKEND_API

const ListAllProducts = () => {

    const param = useParams()

    const { limit } = param

    const [products, setProducts] = useState([]);
    const [length, setLength] = useState(0);
	const [isBusy, setBusy] = useState(true)

    useEffect(() => {

		const getAllProducts = async () => {

			try {

                const response = await fetch(`${API}/products?limit=${limit}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                })
        
                if (response) {
                    var data = await response.json();
                    setProducts(data);
                    setLength(data.length)
                    setBusy(false);
                }

			} catch (error) {
				return console.log(error);
			}
		}

		getAllProducts()

	}, [limit])

    function showProducts(start,end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<ProductAdminCard {...products[i]} key={i}/>)
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
                                isBusy ? <Loading/> : showProducts(0,length)
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ListAllProducts
