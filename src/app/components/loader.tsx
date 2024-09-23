 import React from 'react'
import { ClipLoader } from 'react-spinners';

export default function Loader() {
  return ( 
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-1">
     <ClipLoader className="bg-primary" size={50} />
  </div>
  )
} 