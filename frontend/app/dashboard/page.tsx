'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { Drug } from '@/types';

export default function Dashboard() {
  const [drugs, setDrugs] = useState<Drug[]>([]);

  useEffect(() => {
    apiFetch<{ drugs: Drug[] }>('/listDrugs?page=1')
      .then((data) => setDrugs(data.drugs || []))
      .catch(console.error);
  }, []);

  async function orderDrug(idDrug: number) {
    const amount = prompt('Podaj ilość:') || '1';
    try {
      await apiFetch('/orderDrug', {
        method: 'POST',
        body: JSON.stringify({ id: idDrug, amount: parseFloat(amount) }),
      });
      alert('Zakupiono lek!');
    } catch (e) {
      alert('Błąd: ' + e.message);
    }
  }

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Lista Leków</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {drugs.map((drug) => (
          <div
            key={drug.idDrug}
            className='p-4 border rounded shadow flex flex-col gap-2'
          >
            <h2 className='font-bold text-xl'>{drug.name}</h2>
            <p>Cena: {drug.price} zł</p>
            <button
              className='bg-indigo-600 text-white p-2 rounded mt-auto'
              onClick={() => orderDrug(drug.idDrug)}
            >
              Kup
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
