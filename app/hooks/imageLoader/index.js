const ImageLoader = ({ src, width, quality }) => {
    return `http://tfg.local:8080${src}?w=${width}&q=${quality || 75}`
  }
  export default ImageLoader;