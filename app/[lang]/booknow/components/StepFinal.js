export default function StepFinal({ content, reservationRef }) {
  return (
    <div>
      <h1 className="mt-2 txt-xl font-bold">{content.title}</h1>
      <div className="my-4">
        <p>
          {content.refText} 
          <p className="font-bold">{reservationRef}</p>
        </p>
        <p>{content.secondaryText}</p>
      </div>
    </div>
  );
}
