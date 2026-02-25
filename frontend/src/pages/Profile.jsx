import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Profile = () => {
    const{user} =useContext(AppContext)

    
  return (
    <div>{'hello there '+user?.name}</div>
  )
}

export default Profile

