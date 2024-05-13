import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { myRestaurants } from '../services/restaurentService';

const MyRestaurent = () => {
    const { token } = useSelector((state: any) => state.auth);

    useEffect(()=>{
      myRestaurants(token).then(()=>{

      }).catch(()=>{

      })
    },[])

  return (
    <div>
        
    </div>
  )
}

export default MyRestaurent
