/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';

export default function DrugCard({ drug }: { drug: any }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/drug/${drug.id}`);
  };

  return (
    <div onClick={handleClick}>
      <h3>{drug.name}</h3>
      <p>{drug.description}</p>
    </div>
  );
}
