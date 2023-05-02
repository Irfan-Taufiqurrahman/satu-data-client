import React from 'react'
import { useParams } from 'react-router-dom'

const TopicData = () => {
    const {id} = useParams()
  return (
    <div>TopicData {id}</div>
  )
}

export default TopicData