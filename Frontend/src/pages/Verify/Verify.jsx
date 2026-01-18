import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import './verify.css'
import { storeContext } from '../../Context/Context'


const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const { url } = useContext(storeContext)
  const navigate = useNavigate()

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/verify",
        { success, orderId }
      )

      if (response.data.success) {
        navigate("/myorders")
      } else {
        navigate("/")
      }
    } catch (error) {
      console.error(error)
      navigate("/")
    }
  }

  useEffect(() => {
    verifyPayment()
  },[])

  return (
    <div className='verify'>
      <div className="spinner">
        
      </div>
   
    </div>
  )
}

export default Verify
