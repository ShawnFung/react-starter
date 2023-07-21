import React, { FC } from 'react'
import { QuestionCheckboxStatPropsType } from './interface'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const ChartComponent: FC<QuestionCheckboxStatPropsType> = props => {
  const { stat } = props
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="count"
          isAnimationActive={false}
          data={stat}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ChartComponent
