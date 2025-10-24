import CoffeeMixer from '@/components/coffee-mixer';
import CafeModeToggle from '@/components/cafe-mode-toggle';
import { Coffee } from 'lucide-react';
import TeamSection from '@/components/team-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Coffee className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-2xl font-bold text-primary">
              CoffeeMixer Lab
            </h1>
          </div>
          <CafeModeToggle />
        </div>
      </header>
      <main className="container mx-auto flex-1 p-4 md:p-8">
        <CoffeeMixer />
        <TeamSection />
      </main>
      <footer className="container mx-auto mt-auto py-6 px-4 text-center text-sm text-muted-foreground">
        <p>
          Explore, create, and discover your perfect coffee blend.
        </p>
      </footer>
    </div>
  );
}
