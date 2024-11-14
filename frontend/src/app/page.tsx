'use client'; // This file will use hooks

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';



export default function Home() {

  const router = useRouter();

  const handleSeeAllRecipes = () => {
    router.push('/recipes');
  };

  return (
    <div>

    </div>
  );
}
