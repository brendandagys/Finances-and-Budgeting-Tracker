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
      <ResponsiveContainer width='100%' height='90%'>
        <LineChart
          width={500}
          data={this.props.data}
          margin={{
            top: 5,
            right: 10,
            left: -15,
            bottom: this.props.bottomMargin,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' angle={-40} dy={this.props.dy} />
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
