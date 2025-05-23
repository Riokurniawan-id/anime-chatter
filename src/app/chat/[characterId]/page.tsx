import { Suspense } from 'react';
import ChatInterface from '@/components/chat/chat-interface';
import { getCharacterById } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


function ChatPageContent({ characterId }: { characterId: string }) {
  const character = getCharacterById(characterId);

  if (!character) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <MessageSquare className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Character Not Found</h2>
        <p className="mb-6 text-muted-foreground">Oops! We couldn't find the character you're looking for.</p>
        <Link href="/" passHref legacyBehavior>
          <Button variant="outline" className="text-foreground hover:bg-accent hover:text-accent-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back to selection
          </Button>
        </Link>
      </div>
    );
  }

  return <ChatInterface character={character} />;
}


export default function ChatPage({ params }: { params: { characterId: string } }) {
  const { characterId } = params;

  return (
    <div className="flex flex-col h-screen bg-background">
      <Suspense fallback={<ChatPageSkeleton />}>
        <ChatPageContent characterId={characterId} />
      </Suspense>
    </div>
  );
}

// Skeleton component for the chat page
function ChatPageSkeleton() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center p-3 sm:p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10 shadow-sm">
        <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mr-3 sm:mr-4" />
        <Skeleton className="h-6 w-32 sm:w-40 rounded-md" />
      </header>
      <div className="flex-grow p-3 sm:p-6 overflow-y-auto space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`flex items-end space-x-2 sm:space-x-3 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            {i % 2 === 0 && <Skeleton className="h-8 w-8 sm:h-9 sm:w-9 rounded-full" />}
            <Skeleton className="h-12 sm:h-16 w-3/5 sm:w-1/2 rounded-2xl" />
            {i % 2 !== 0 && <Skeleton className="h-8 w-8 sm:h-9 sm:w-9 rounded-full" />}
          </div>
        ))}
      </div>
      <footer className="p-3 sm:p-4 border-t border-border bg-background/95 sticky bottom-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Skeleton className="h-12 flex-grow rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  const { animeCharacters } = await import('@/lib/characters');
  return animeCharacters.map((character) => ({
    characterId: character.id,
  }));
}
