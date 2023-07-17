import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { id = '' } = useParams()
  const { loading, error } = useLoadQuestionData()
  return (
    <div>
      <p>Stat Page</p>
      {/* {loading ? <p>loading</p> : <div>{JSON.stringify(data)}</div>} */}
    </div>
  )
}

export default Stat
