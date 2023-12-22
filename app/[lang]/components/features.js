// Features.js

import FeatureCard from '@/app/[lang]/components/featureCard';

const Features = ({ content }) => {
  const features = content;

  return (
    <section id='features' className="secondary shadow-md px-6 py-16 w-full">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{features.title}</h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.featuresList.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;