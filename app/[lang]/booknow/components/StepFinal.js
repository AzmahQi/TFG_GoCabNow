export default function StepFinal({ reservationRef }) {
  return (
    <div>
      <h1 className="mt-2 txt-xl font-bold">Step Final: Success Result</h1>
      <div className="my-4">
        <p>
          This is your reservation reference: <strong>{reservationRef}</strong>.
          With this reference, a taxi driver will contact you via WhatsApp.
        </p>
      </div>
    </div>
  );
}
