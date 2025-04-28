// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import DrugCard from '@/components/DrugCard';

export default function Home() {
  const [drugs, setDrugs] = useState<any[]>([]);

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const { data } = await api.get('/listDrugs');
        setDrugs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDrugs();
  }, []);

  return (
    <div>
      <h1>Drugs List</h1>
      {drugs.map((drug) => (
        <DrugCard key={drug.id} drug={drug} />
      ))}
    </div>
  );
}
