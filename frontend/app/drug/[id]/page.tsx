// app/drug/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function DrugDetail({ params }: { params: { id: string } }) {
  const [drug, setDrug] = useState<any>(null);
  const { id } = params;

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const { data } = await api.get(`/getDrug?id=${id}`);
        setDrug(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDrug();
  }, [id]);

  if (!drug) return <div>Loading...</div>;

  return (
    <div>
      <h1>{drug.name}</h1>
      <p>{drug.description}</p>
      <button>Add to Cart</button>
    </div>
  );
}
