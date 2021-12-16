import React from 'react'
import Navbar from './../../components/Navbar/Navbar'
import Card from './../../components/Cards/Developers/Card'
import img1 from './../../images/developers/yash.jfif'
import img2 from './../../images/developers/pawan.jpg'
import img3 from './../../images/developers/rishabh.jpg'
import img4 from './../../images/developers/vishwesh.jpg'
import img5 from './../../images/developers/rishabh.jpg'
import img6 from './../../images/developers/bhaskar.jpg'

const Developers = () => {

    const developers = [
        {
            name:"Yash Gupta",
            email:"yash.g19@iiits.in",
            img:img1,
            facebook:"https://www.facebook.com/profile.php?id=100015580264926",
            instagram:"https://www.instagram.com/yash_g.27",
            linkdin:"https://www.linkedin.com/in/yash-gupta-a5304b199/"
        },
        {
            name:"Pawankumar Jaiswal",
            email:"pawankumarrajeshlal.j19@iiits.in",
            img:img2,
            facebook:"https://www.facebook.com/pawanjaiswal0843/",
            instagram:"https://www.instagram.com/pawan_jaiswal_08/",
            linkdin:"https://www.linkedin.com/in/pawankumar-jaiswal-3a220b193/"
        },
        {
            name:"Laurel Verma",
            email:"laurel.v19@iiits.in",
            img:img3,
            facebook:"https://www.facebook.com/laurel.verma.14/",
            instagram:"https://www.instagram.com/laurel_verma/",
            linkdin:"https://www.linkedin.com/in/laurel-verma-ab7738192/"
        },
        {
            name:"Vishwesh Dhoble",
            email:"vishweshnavneet.d19@iiits.in",
            img:img4,
            facebook:"",
            instagram:"",
            linkdin:""
        },
        {
            name:"Rishabh Jha",
            email:"rishabh.j19@iiits.in",
            img:img5,
            facebook:"",
            instagram:"",
            linkdin:""
        },
        {
            name:"V. Sai Bhaskar",
            email:"saibhaskar.v19@iiits.in",
            img:img6,
            facebook:"",
            instagram:"",
            linkdin:""
        }
    ]
    
    return (
        <>
            <Navbar/>
            <div className="bada">
                <section>
                    <div className="container">
                        <Card {...developers[0]}/>
                        <Card {...developers[1]}/>
                        <Card {...developers[2]}/>
                    </div>
                    <div className="container">
                        <Card {...developers[3]}/>
                        <Card {...developers[4]}/>
                        <Card {...developers[5]}/>
                    </div>
                </section>
            </div>
        </>
        
    )
}

export default Developers;
