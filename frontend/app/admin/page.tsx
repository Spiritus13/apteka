'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { Drug } from '@/types';

export default function AdminPage() {
  const [drugs, setDrugs] = useState<Drug[]>([]);

  useEffect(() => {
    apiFetch<{ drugs: Drug[] }>('/listDrugs?page=1')
      .then((data) => setDrugs(data.drugs || []))
      .catch(console.error);
  }, []);

  async function removeDrug(idDrug: number) {
    try {
      await apiFetch('/removeDrug', {
        method: 'POST',
        body: JSON.stringify({ id: idDrug }),
      });
      alert('Lek usunięty.');
      setDrugs((d) => d.filter((x) => x.idDrug !== idDrug));
    } catch (e) {
      alert('Błąd: ' + e.message);
    }
  }

  async function updateDrugField(idDrug: number) {
    const field = prompt('Podaj nazwę pola do zmiany:');
    const value = prompt('Podaj nową wartość:');
    if (!field || !value) return;

    try {
      await apiFetch('/updateDrug', {
        method: 'PATCH',
        body: JSON.stringify({
          id: idDrug,
          nazwaPolaDoZmiany: field,
          wartość: value,
        }),
      });
      alert('Zaktualizowano lek.');
    } catch (e) {
      alert('Błąd: ' + e.message);
    }
  }

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Panel Admina</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {drugs.map((drug) => (
          <div
            key={drug.idDrug}
            className='p-4 border rounded shadow flex flex-col gap-2'
          >
            <h2 className='font-bold text-xl'>{drug.name}</h2>
            <button
              className='bg-red-600 text-white p-2 rounded'
              onClick={() => removeDrug(drug.idDrug)}
            >
              Usuń
            </button>
            <button
              className='bg-yellow-400 text-black p-2 rounded'
              onClick={() => updateDrugField(drug.idDrug)}
            >
              Edytuj
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
