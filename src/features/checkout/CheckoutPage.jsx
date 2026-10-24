import { useEffect, useState } from 'react'
import { createPayment } from '../../services/paymentService.js'
import StepIndicator from './StepIndicator.jsx'
import ServiceStep from './ServiceStep.jsx'
import PaymentStep from './PaymentStep.jsx'
import ProcessingStep from './ProcessingStep.jsx'
import ReceiptStep from './ReceiptStep.jsx'

// The checkout is a small state machine:
//   service → payment → processing → receipt
// Each step is its own component; this page only decides which one to show.
export default function CheckoutPage() {
  const [step, setStep] = useState('service')
  const [serviceId, setServiceId] = useState(null)
  const [method, setMethod] = useState('swish')
  const [receipt, setReceipt] = useState(null)

  // Start the (fake) payment when we enter the processing step. The cleanup
  // flag stops a late reply from updating the page after the user has left it.
  useEffect(() => {
    if (step !== 'processing') return
    let cancelled = false
    createPayment({ serviceId, method }).then((result) => {
      if (cancelled) return
      setReceipt(result)
      setStep('receipt')
    })
    return () => {
      cancelled = true
    }
  }, [step, serviceId, method])

  const restart = () => {
    setStep('service')
    setServiceId(null)
    setReceipt(null)
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Betala besök</h1>
      <StepIndicator step={step} />

      {step === 'service' && (
        <ServiceStep selectedId={serviceId} onSelect={setServiceId} onNext={() => setStep('payment')} />
      )}
      {step === 'payment' && (
        <PaymentStep
          serviceId={serviceId}
          method={method}
          onMethodChange={setMethod}
          onBack={() => setStep('service')}
          onPay={() => setStep('processing')}
        />
      )}
      {step === 'processing' && <ProcessingStep method={method} />}
      {step === 'receipt' && receipt && <ReceiptStep receipt={receipt} onDone={restart} />}
    </div>
  )
}
