import React, { useEffect, useState } from 'react';
import { useGetSKUsQuery } from '../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Layout from './Layout';
export default function SKUStatistics() {
  const {
    data: skus = [],
    isLoading,
    isError,
  } = useGetSKUsQuery({
    search: '',
    sortKey: null,
    sortOrder: 'asc',
  });
  const [chartData, setChartData] = useState<
    { name: string; sales: number; returnPercent: number }[]
  >([]);
  useEffect(() => {
    if (skus.length > 0) {
      const transformed = skus.map((sku) => ({
        name: sku.name,
        sales: sku.sales,
        returnPercent: sku.returnPercent,
      }));
      setChartData(transformed);
    }
  }, [skus]);
  if (isLoading) return <div className='p-4'>Loading chart...</div>;
  if (isError)
    return <div className='p-4 text-red-600'>Failed to load data.</div>;
  return (
    <Layout>
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2'>SKU Sales & Return %</h2>
        <div className='flex gap-4 mb-4 font-medium justify-center'>
          <span className='flex items-center gap-1 text-blue-600'>
            <span className='w-3 h-3 bg-blue-600 inline-block' /> Sales
          </span>
          <span className='flex items-center gap-1 text-red-500'>
            <span className='w-3 h-3 bg-red-500 inline-block' /> Return %
          </span>
        </div>
        <div className='overflow-x-auto'>
          <div className='min-w-[700px] h-96'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='name'
                  angle={-45}
                  textAnchor='end'
                  interval={0}
                  height={70}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey='sales' fill='#3B82F6' name='Sales' />
                <Bar dataKey='returnPercent' fill='#EF4444' name='Return %' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
