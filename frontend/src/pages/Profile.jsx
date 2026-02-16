import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Profile = () => {
    const{name} =useContext(AppContext)
  return (
    <div>{'hello there '+name}</div>
  )
}

export default Profile