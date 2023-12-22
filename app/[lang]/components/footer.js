const Footer = ({content}) => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy;{" " + content.copyright}</p>
        <a
          href="https://es.linkedin.com/in/hikousar"
          target="_blank"
          className=""
        >
          <span className="text-white text-2xl font-bold bg-sky-950 px-2">in</span><i className="font-bold text-sky-950">&reg;</i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;