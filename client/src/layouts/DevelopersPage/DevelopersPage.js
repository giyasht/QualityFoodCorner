import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import DeveloperCard from './../../components/DeveloperCard/DeveloperCard'
import Loading from '../../components/Loading/Loading'
const API = process.env.REACT_APP_BACKEND_API

const Developers = () => {

    const [developers, setDevelopers] = useState([]);
    const [length, setLength] = useState(0);

	const [isBusy, setBusy] = useState(true)

	useEffect(() => {

		const getAllDevelopers = async () => {

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
                    // console.log(data);
                    setLength(data.length)
                    setBusy(false);
                }

			} catch (error) {
				return console.log(error);
			}
		}

		getAllDevelopers()

	}, [])

    function showDevelopers(start,end){
        
        var elements = [];
        
        for(var i=start; i<end; i++){
            elements.push(<DeveloperCard {...developers[i]} key={i}/>)
        }
        
        return elements;
    }

    
	
    return (
        <>
            <Navbar/>

            <div className="bada">

                {
                    isBusy  ?   <Loading/>
                            :   <section>
                                    <div className="container">
                                        {
                                            showDevelopers(0,length/2)
                                        }
                                    </div>
                                    <div className="container">
                                        {
                                            showDevelopers(length/2,length)
                                        }
                                        {/* <DeveloperCard {...developers[3]}/>
                                        <DeveloperCard {...developers[4]}/>
                                        <DeveloperCard {...developers[5]}/> */ }
                                    </div>
                                </section>
                }
                
            </div>

            
        </>
        
    )
}

export default Developers;
