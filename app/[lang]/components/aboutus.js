'use client'
const AboutUs = ({content}) => {
    const aboutUs = content;
    return (
      <section id="aboutUs" className="primary shadow-md px-6 py-16 w-full">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-8">{aboutUs.title}</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutUs.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">{section.heading}</h3>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="text-blue-300 mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
        </div>
      </section>
    );
  };
  
  export default AboutUs;