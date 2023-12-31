const ImageLoader = ({ src, width, quality }) => {
  // Check if window is defined (client-side rendering)
  const baseURL = typeof window !== 'undefined' ? window.location.origin : '';

  // Construct the image URL
  const imageURL = baseURL !== null ? `${baseURL}${src}?w=${width}&q=${quality || 75}`:'';
  return imageURL;
};

export default ImageLoader;
