'use client'
import TestimonialCard from '@/app/[lang]/components/testimonialCard';

const Testimonials = ({ testimonials }) => {
  return (
    <section className="primary shadow-inner py-16 w-full">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{testimonials.title}</h2>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-8">
          {testimonials.testimonialsList.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <TestimonialCard
                name={testimonial.name}
                comment={testimonial.comment}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


