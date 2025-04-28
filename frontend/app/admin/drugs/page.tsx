/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

export default function AdminDrugs() {
  const [drugName, setDrugName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDrug = async () => {
    if (!drugName.trim() || !description.trim()) {
      toast.error('Uzupełnij wszystkie pola.');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/addDrug', { name: drugName, description });
      toast.success('Lek został dodany.');
      setDrugName('');
      setDescription('');
    } catch (err: unknown) {
      toast.error('Błąd podczas dodawania leku.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto py-10 flex justify-center'>
      <Card className='w-full max-w-lg p-6'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>
            Panel Admina - Dodaj Lek
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='drugName'>Nazwa leku</Label>
            <Input
              id='drugName'
              type='text'
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              placeholder='Wpisz nazwę leku'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Opis</Label>
            <Input
              id='description'
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Wpisz opis leku'
            />
          </div>
          <Button
            onClick={handleAddDrug}
            disabled={isLoading}
            className='w-full'
          >
            {isLoading ? 'Dodawanie...' : 'Dodaj Lek'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
