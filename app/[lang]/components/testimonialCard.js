const TestimonialCard = ({ name, comment }) => {
    return (
      <div className="relative secondary p-6 mb-8 border border-gray-600 shadow-md overflow-hidden">
        <p className="text-gray-400 mb-2">&ldquo;{comment}&bdquo;</p>
        <h3 className="text-lg font-bold absolute bottom-0 right-0 p-2">
          -- {name}
        </h3>
        <div className="absolute inset-0 border-2 border-dashed border-gray-500"></div>
      </div>
    );
  };
  
  export default TestimonialCard;