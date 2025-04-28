'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function DrugDetail({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [drug, setDrug] = useState<any>(null);
  const { id } = params;

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        const { data } = await api.get(`/getDrug?id=${id}`);
        setDrug(data);
      } catch (err) {
        console.error(err);
        toast.error('Nie udało się załadować leku.');
      }
    };
    fetchDrug();
  }, [id]);

  if (!drug) {
    return (
      <div className='container mx-auto py-10 flex justify-center'>
        <Card className='w-full max-w-md p-6'>
          <CardHeader>
            <Skeleton className='h-8 w-3/4 mb-4' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
            <Skeleton className='h-10 w-full' />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-10 flex justify-center'>
      <Card className='w-full max-w-md p-6'>
        <CardHeader>
          <CardTitle className='text-2xl'>{drug.name}</CardTitle>
          <CardDescription className='mt-2 text-muted-foreground'>
            ID: {drug.id}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <p className='text-base leading-relaxed'>{drug.description}</p>
          <Button className='w-full' variant='default'>
            Dodaj do koszyka 🛒
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
