import React, { FC, useState, useEffect } from 'react'
import useGetComponents from '../../../hooks/useGetComponents'
import { getComponentConfByType } from '../../../components/questionComponents'
import { Typography } from 'antd'
import { getComponentStatService } from '../../../services/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'

const ChartStat: FC = () => {
  const { id = '' } = useParams()
  const { selectedComponent, selectedId } = useGetComponents()
  const [stat, setStat] = useState([])
  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )

  useEffect(() => {
    if (selectedId) run(id, selectedId)
  }, [id, selectedId])

  if (!selectedComponent) {
    return <div>未选中组件</div>
  }
  const comp = getComponentConfByType(selectedComponent.type)
  console.log(comp)
  if (!comp || !comp.ChartComponent) {
    return <div>该组件无统计图表</div>
  }
  const { ChartComponent } = comp
  return (
    <>
      <Typography.Title level={3}>图表统计</Typography.Title>
      <ChartComponent stat={stat} />
    </>
  )
}

export default ChartStat
