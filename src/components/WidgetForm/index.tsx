import bugImageUrl from '../../assets/bug.svg';
import ideiaImageUrl from '../../assets/ideia.svg';
import otherImageUrl from '../../assets/other.svg';
import { useState } from 'react';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedBackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto',
    },
  },
  IDEIA: {
    title: 'Ideia',
    image: {
      source: ideiaImageUrl,
      alt: 'Imagem de uma lampada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: otherImageUrl,
      alt: 'Imagem de um balão de pensamento',
    },
  },
}

export type FeedBackType = keyof typeof feedBackTypes;

export function WidgetForm() {
  const [feedbackType, setfeedbackType] = useState<FeedBackType | null>();
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setfeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestart={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep feedback={setfeedbackType} />
            ) : (
            <FeedbackContentStep 
              feedbackType={feedbackType} 
              onRestart={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-1" href="https://github.com/felipefpm">Skydev</a>
      </footer>
    </div>

  )
}