import React, { useState, useEffect } from 'react';
import { useGetSKUsQuery } from '../services/api';
import { Link } from '@tanstack/react-router';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from './Layout';
export default function SKUList() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'sales' | 'return_percent' | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const {
    data: skus = [],
    isLoading,
    isError,
    refetch,
  } = useGetSKUsQuery({ search, sortKey, sortOrder });
  useEffect(() => {
    refetch();
  }, [search, refetch]);
  const toggleSort = (key: 'sales' | 'return_percent') => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };
  const resetSort = () => {
    setSortKey(null);
    setSortOrder('asc');
  };
  const renderSortIcon = (key: 'sales' | 'return_percent') => {
    if (sortKey === key) {
      return sortOrder === 'asc' ? (
        <ArrowUp className='inline w-4 h-4 ml-1' />
      ) : (
        <ArrowDown className='inline w-4 h-4 ml-1' />
      );
    }
    return <ArrowUpDown className='inline w-4 h-4 ml-1 text-gray-400' />;
  };
  if (isLoading) return <div className='p-4 text-center'>Loading...</div>;
  if (isError) {
    toast.error('Failed to fetch SKUs. Please try again.');
    return (
      <div className='p-4 text-red-600 text-center'>
        Failed to load SKU list.
        <button
          onClick={() => refetch()}
          className='ml-2 text-blue-600 underline'
        >
          Retry
        </button>
      </div>
    );
  }
  if (!skus || skus.length === 0) {
    return (
      <div className='p-4 text-gray-600 text-center'>
        No SKUs found matching your criteria.
      </div>
    );
  }
  return (
    <Layout>
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>SKU Dashboard</h1>
        <input
          type='text'
          placeholder='Search by name...'
          className='border p-2 rounded mb-4 w-full max-w-md'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {sortKey && (
          <button
            onClick={resetSort}
            className='mb-4 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded'
          >
            Reset Sort
          </button>
        )}
        <table className='w-full border border-gray-300 text-left'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='p-2'>SKU ID</th>
              <th className='p-2'>Name</th>
              <th
                className='p-2 cursor-pointer'
                onClick={() => toggleSort('sales')}
              >
                Sales {renderSortIcon('sales')}
              </th>
              <th
                className='p-2 cursor-pointer'
                onClick={() => toggleSort('return_percent')}
              >
                Return % {renderSortIcon('return_percent')}
              </th>
              <th className='p-2'>Content Score</th>
            </tr>
          </thead>
          <tbody>
            {skus.map((sku) => (
              <tr key={sku.id} className='hover:bg-gray-50'>
                <td className='p-2'>
                  <Link
                    to={`/sku/${sku.id}`}
                    className='text-blue-600 underline'
                  >
                    {sku.id}
                  </Link>
                </td>
                <td className='p-2'>{sku.name}</td>
                <td className='p-2'>{sku.sales}</td>
                <td className='p-2'>{sku.returnPercent}%</td>
                <td className='p-2'>{sku.contentScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
