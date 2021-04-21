import React, { PureComponent } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from 'recharts'

export default class PurchaseLineChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={500}
          height={300}
          data={this.props.data}
          margin={{
            top: 5,
            right: 10,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Line
            type='monotone'
            dataKey='Amount'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
          {/* <Line type='monotone' dataKey='uv' stroke='#82ca9d' /> */}
        </LineChart>
      </ResponsiveContainer>
    )
  }
}
