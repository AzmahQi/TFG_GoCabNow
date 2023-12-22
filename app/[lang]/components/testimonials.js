'use client'
import TestimonialCard from '@/app/[lang]/components/testimonialCard';

const Testimonials = ({ testimonials }) => {
  return (
    <section id='testimonials' className="primary py-16 w-full">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">{testimonials.title}</h2>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-3 gap-5">
          {testimonials.testimonialsList.map((testimonial, index) => (
            <div key={index} className="testimonial-card odd:col-start-2 col-span-2 even:col-start-1 col-span-2">
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


