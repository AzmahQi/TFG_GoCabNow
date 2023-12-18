// FeatureCard.js
const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="primary p-6 rounded-md shadow-inner mb-8">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sky-600">{description}</p>
    </div>
  );
};
export default FeatureCard;
