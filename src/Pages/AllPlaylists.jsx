import React from 'react'
import Playlists from '../components/Playlists'
import Header from '../components/Header/Header'

const AllPlaylists = () => {
  return (
    <div className=''>
        <Header />
      <div className='px-5 py-2'><Playlists grid="true" /></div>
    </div>
  )
}

export default AllPlaylists
