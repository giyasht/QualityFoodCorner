import React, { useState, useEffect } from 'react'
import DeveloperAdminCard from '../../components/DeveloperAdminCard/DeveloperAdminCard'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
import Loading from '../../../components/Loading/Loading'
const API = process.env.REACT_APP_BACKEND_API

const ListAllDeveloper = () => {

    const [developers, setDevelopers] = useState([]);
    const [length, setLength] = useState(0);
	const [isBusy, setBusy] = useState(true)

    useEffect(() => {

		const getAllStores = async () => {

			try {

                const response = await fetch(`${API}/developer/all`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                })
        
                if (response) {
                    var data = await response.json();
                    setDevelopers(data);
                    setLength(data.length)
                    setBusy(false);
                }

			} catch (error) {
				return console.log(error);
			}
		}

		getAllStores()

	}, [])

    function showDevelopers(start,end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<DeveloperAdminCard {...developers[i]} key={i}/>)
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
                                isBusy ? <Loading/> : showDevelopers(0,length)
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default ListAllDeveloper;
