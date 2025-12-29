'use client'

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
import { TopProduct } from '@/types'

type Props = {
	data: TopProduct[]
}

export default function TopProductsChart({ data }: Props) {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='productName' />
				<YAxis />
				<Tooltip />
				<Bar dataKey='revenue' fill='#D4A373' />
			</BarChart>
		</ResponsiveContainer>
	)
}
