'use client'

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
import { DailyRevenue } from '@/types'

type Props = {
	data: DailyRevenue[]
}

export default function RevenueChart({ data }: Props) {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='date' />
				<YAxis />
				<Tooltip />
				<Line
					type='monotone'
					dataKey='revenue'
					stroke='#8B5A3C'
					strokeWidth={2}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}
