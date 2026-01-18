import React, { useState } from 'react'
import Header from '../../Component/Header/Header'
import ExploreMenu from '../../Component/ExploreMenu/ExploreMenu'
import Food_list from '../../Component/Food_list/Food_list'
import Footer from '../../Component/Footer/Footer'
import Mobile_App from '../../Component/Movile-app/Mobile_App'


const Home = () => {
  const[category,setCategory]=useState("all")
  return (
    <div>
      <Header/>
      
      <ExploreMenu category={category} setCategory={setCategory}/>
      <Food_list category={category} />
      <Mobile_App/>
      <Footer/>
      
    </div>
  )
}

export default Home
