'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ThemeToggle } from './theme-toggle';

interface NavbarProps {
    onStartBuilding?: () => void;
    showBuilderActions?: boolean;
    onPrint?: () => void;
    onGoHome?: () => void;
}

export function Navbar({ 
    onStartBuilding, 
    showBuilderActions = false, 
    onPrint,
    onGoHome,
}: NavbarProps) {
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'Help', href: '/#help' }
    ];

    const builderActions = (
        <>
            <Button onClick={onPrint} className="bg-accent hover:bg-accent/90">
                <Download className="mr-2 h-4 w-4"/>
                Download PDF
            </Button>
        </>
    );

    const landingActions = (
        <Button onClick={onStartBuilding}>
            Start Building
            <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
    );

    return (
      <header className="bg-card border-b sticky top-0 z-20 print:hidden">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold font-headline text-primary">ResumeAce</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
                showBuilderActions ? (
                    <button key={link.name} onClick={onGoHome} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                    </button>
                ) : (
                    <Link key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                    </Link>
                )
            ))}
            <div className="flex items-center gap-2">
                {showBuilderActions ? builderActions : landingActions}
            </div>
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="sm:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] p-0 flex flex-col">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>
                    <SheetClose asChild>
                      <Link href="/" className="text-xl font-bold font-headline text-primary">ResumeAce</Link>
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 p-4">
                    {navLinks.map((link) => (
                        <SheetClose asChild key={link.name}>
                            {showBuilderActions ? (
                                <button onClick={onGoHome} className="w-full text-left text-lg font-medium text-foreground hover:text-primary transition-colors">
                                    {link.name}
                                </button>
                            ) : (
                                <Link href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                                    {link.name}
                                </Link>
                            )}
                        </SheetClose>
                    ))}
                </nav>
                <div className="mt-auto flex flex-col gap-4 p-4 border-t">
                    {showBuilderActions ? (
                        <>
                            <SheetClose asChild>
                                <Button onClick={onPrint} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF
                                </Button>
                            </SheetClose>
                        </>
                    ) : (
                         <SheetClose asChild>
                            <Button onClick={onStartBuilding} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                                Start Building
                            </Button>
                        </SheetClose>
                    )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    );
}
