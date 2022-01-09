import React, { useState, useEffect } from 'react'
import StoreAdminCard from '../../components/StoreAdminCard/StoreAdminCard'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import Loading from '../../../components/Loading/Loading'
const API = process.env.REACT_APP_BACKEND_API

const ListAllStore = () => {

    const [stores, setStores] = useState([]);
    const [length, setLength] = useState(0);
	const [isBusy, setBusy] = useState(true)

    useEffect(() => {

		const getAllStores = async () => {

			try {

                const response = await fetch(`${API}/stores`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                })
        
                if (response) {
                    var data = await response.json();
                    setStores(data.data);
                    setLength(data.data.length)
                    setBusy(false);
                }

			} catch (error) {
				return console.log(error);
			}
		}

		getAllStores()

	}, [])

    function showStores(start,end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<StoreAdminCard {...stores[i]} key={i}/>)
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
                                isBusy ? <Loading/> : showStores(0,length)
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ListAllStore;
