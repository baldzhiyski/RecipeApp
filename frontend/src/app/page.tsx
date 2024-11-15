'use client'; // This file will use hooks

import { Button } from '@nextui-org/react'; // Corrected import from NextUI
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const navigateToAnotherPage = () => {
    // Navigate to another page, for example '/about'
    router.push('/about');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Recipe App</h1>
      <p className="text-lg mb-6">Discover delicious recipes and find inspiration for your next meal.</p>

    </div>
  );
}
