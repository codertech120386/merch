import { Link } from '@tanstack/react-router';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-blue-600 text-white px-6 py-4 flex gap-6'>
      <Link
        to='/'
        activeProps={{ className: 'font-bold underline' }}
        className='hover:underline'
        activeOptions={{ exact: true }}
      >
        Home
      </Link>
      <Link
        to='/sku/statistics'
        activeProps={{ className: 'font-bold underline' }}
        className='hover:underline'
      >
        Statistics
      </Link>
    </nav>
  );
};

export default Navbar;
