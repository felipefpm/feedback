import { ClosedButton } from "../../ClosedButton";
import { FeedBackType, feedBackTypes } from '..';
import { ArrowLeft } from "phosphor-react";
import { ScreenshotButton } from "../ScreenshotButton";
import { FormEvent, useState } from "react";
import { api } from './../../../service/api';
import { Loading } from "../Loading";

interface FeedbackContentStepProps {
  feedbackType: FeedBackType
  onRestart: () => void
  onFeedbackSent: () => void
}

export function FeedbackContentStep({feedbackType, onRestart, onFeedbackSent}: FeedbackContentStepProps) {
  const [screedshot, setScreedshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const feedbackTypeInfo = feedBackTypes[feedbackType];

  async function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault();

    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screedshot,
    })

    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
   <>
      <header>
        <button 
          type="button" 
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onRestart}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='w-6 h-6' />
          {feedbackTypeInfo.title}
        </span>

        <ClosedButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm placegodler-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" 
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={e => setComment(e.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
           onScreenShotTook={setScreedshot} 
           screenshot={screedshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  );
}