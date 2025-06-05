import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { api } from '../services/api';
export default function Root() {
  return (
    <ApiProvider api={api}>
      <Outlet />
    </ApiProvider>
  );
}
