const MESSAGES = {
  swish: { title: 'Öppna Swish-appen', text: 'Godkänn betalningen i Swish på din telefon.' },
  card: { title: 'Behandlar betalning', text: 'Vi kontaktar din bank…' },
  applepay: { title: 'Bekräfta med Face ID', text: 'Väntar på Apple Pay…' },
}

export default function ProcessingStep({ method }) {
  const { title, text } = MESSAGES[method]

  return (
    <div className="flex flex-col items-center py-12 text-center" role="status" aria-live="polite">
      <span className="size-14 animate-spin rounded-full border-4 border-zinc-800 border-t-brand" aria-hidden="true" />
      <p className="mt-6 text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm text-zinc-400">{text}</p>
      <p className="mt-6 text-xs text-zinc-600">Stäng inte sidan.</p>
    </div>
  )
}
