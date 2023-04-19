import React from 'react'
import { useParams } from 'react-router-dom'

const TheamticData = () => {
    const {id} = useParams()
  return (
    <div>TheamticData {id}</div>
  )
}

export default TheamticData