import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './Mobile_App.css'
const Mobile_App = () => {
  return (
    <div>
      <div className="download" id="download-app">
        <h1>For Better Experience Download ZestyBite App</h1>
        <div className="image">
        <img src={assets.play_store}/>
        <img src={assets.app_store}/>
        </div>
      </div>
    </div>
  )
}

export default Mobile_App;
