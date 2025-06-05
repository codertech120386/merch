import React, { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useGetSKUByIdQuery, useAddNoteMutation } from '../services/api';
import Layout from './Layout';
export default function SKUDetail() {
  const { id } = useParams({ from: '/sku/$id' });
  const {
    data: sku,
    refetch,
    isError: getSkuByIdError,
    isLoading,
  } = useGetSKUByIdQuery(id);
  const [note, setNote] = useState('');
  const [addNote] = useAddNoteMutation();
  const [isSaving, setIsSaving] = useState(false);

  const saveNote = async (isOld: boolean) => {
    if (!note.trim()) return;
    setIsSaving(true);
    try {
      await addNote({
        newNote: isOld ? false : true,
        skuId: id,
        content: note.trim(),
        userRole: 'brand_user',
      }).unwrap();
      toast.success('Note saved');
      refetch();
    } catch (err) {
      toast.error('Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!note.trim()) return;
    const timeout = setTimeout(() => {
      saveNote(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [note]);

  if (isLoading) {
    return <div className='p-4'>Loading SKU details...</div>;
  }

  if (getSkuByIdError || !sku) {
    toast.error('Failed to load SKU detail. Please try again.');
    return (
      <div className='p-4 text-red-600'>
        Error loading SKU detail.{' '}
        <button
          onClick={() => refetch()}
          className='text-blue-600 underline ml-2'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <Layout>
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2'>
          {sku.name} (ID: {sku.id})
        </h2>
        <p>Sales: {sku.sales}</p>
        <p>Return %: {sku.returnPercent}</p>
        <p>Content Score: {sku.contentScore}</p>
        <div className='my-6'>
          <h3 className='font-semibold mb-2'>Sales Trend</h3>
        </div>
        <div className='mt-6'>
          <h3 className='font-semibold mb-1'>Add Note</h3>
          <textarea
            className='w-full border p-2 rounded mb-2'
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <p className='text-sm text-gray-500'>
            {isSaving ? 'Saving...' : 'Auto-saving note...'}
          </p>
        </div>
        <div className='mt-6'>
          <h3 className='font-semibold'>Notes</h3>
          {sku.notes.length === 0 ? (
            <p className='text-sm text-gray-600'>No notes added yet.</p>
          ) : (
            <ul className='list-disc pl-4'>
              {sku.notes.map((note: any, idx: number) =>
                note.content.length > 0 ? (
                  <li key={idx} className='mt-1'>
                    <span className='font-medium'>[{note.userRole}]</span>{' '}
                    {note.content}
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
