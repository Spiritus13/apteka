'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function AdminDrugs() {
  const [drugName, setDrugName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddDrug = async () => {
    try {
      await api.post('/addDrug', { name: drugName, description });
      alert('Drug added successfully');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err:unknown) {
      alert('Error adding drug');
    }
  };

  return (
    <div>
      <h1>Admin - Add Drug</h1>
      <input
        type='text'
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
        placeholder='Drug Name'
      />
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Description'
      />
      <button onClick={handleAddDrug}>Add Drug</button>
    </div>
  );
}
