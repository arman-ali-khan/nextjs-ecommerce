import UserLayout from '@/Layout/UserLayout';
import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

const index = () => {
    return (
           <UserLayout>
           <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>Id</th>
        <th>Order Time</th>
        <th>Status</th>
        <th>Total</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>May 4, 2023</td>
        <td>Processing</td>
        <td className='flex items-center font-bold'> <TbCurrencyTaka className='font-bold' size={20}/> 12345</td>
        <td><button className='bg-blue-100 text-blue-600 rounded-full px-2 py-0.5'>Details</button></td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>May 4, 2023</td>
        <td>Pending</td>
        <td className='flex items-center font-bold'> <TbCurrencyTaka className='font-bold' size={20}/> 12345</td>
        <td><button className='bg-blue-100 text-blue-600 rounded-full px-2 py-0.5'>Details</button></td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>May 4, 2023</td>
        <td>Delivered</td>
        <td className='flex items-center font-bold'> <TbCurrencyTaka className='font-bold' size={20}/> 12345</td>
        <td><button className='bg-blue-100 text-blue-600 rounded-full px-2 py-0.5'>Details</button></td>
      </tr>
    </tbody>
  </table>
</div>
            </UserLayout>
    );
};

export default index;