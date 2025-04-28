// app/orders/page.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function Orders() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orderHistory');
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <p>{order.drugName}</p>
          <p>{order.status}</p>
        </div>
      ))}
    </div>
  );
}
