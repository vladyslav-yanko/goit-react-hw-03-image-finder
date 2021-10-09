import PropTypes from 'prop-types';
import ImageItem from 'Component/ImageItem/ImageItem';

export default function ImageGallery({ images }) {
  return (
    <ul className="ImageGallery">
      {images.map(img => (
        <ImageItem
          src={img.webformatURL}
          alt={img.tags}
          largeImageURL={img.largeImageURL}
          key={img.id}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
