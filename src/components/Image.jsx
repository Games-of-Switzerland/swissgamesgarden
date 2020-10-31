import {useState} from 'react';
import Placeholder from './Placeholder';

const Source = ({links, srcSet = [], type}) => {
  // Handle jpeg/jpg
  const typeOriginal = type;
  if (type === 'jpeg') {
    type = 'jpg';
  }

  const srcSetString =
    srcSet.length > 1
      ? srcSet.map((src, i) => `${links[src].href} ${i + 1}x`).join(', ')
      : links[srcSet[0]].href;

  const regex = new RegExp(`\.${type}`, 'gi');

  const webpSrcSetString = srcSetString.replace(regex, '.webp');

  return (
    <>
      <source srcSet={webpSrcSetString} type="image/webp" />
      <source srcSet={srcSetString} type={`image/${typeOriginal}`} />
    </>
  );
};

const IMG_MIN_WIDTH = 330;
const IMG_MAX_HEIGHT = 500;

const getImageType = image => {
  if (!image) return null;

  const fromFileMIME = image.filemime?.replace('image/', '');
  const fromHref = image.href?.match(/\.(png|jpe?g|gif)/i);

  return fromFileMIME || fromHref[1];
};

const Image = ({
  image,
  alt,
  style,
  sources = [],
  ratio,
  className,
  defaultSize = 'downscale_675x500',
}) => {
  const [loaded, setLoaded] = useState(false);
  const imageType = getImageType(image);

  const {width, height} = image.meta || image;
  const imgRatio = height / width;

  const wrapperStyle = {
    '--ratio': `${(ratio || imgRatio) * 100}%`,
  };

  style = {
    ...style,
    minWidth: `min(100%, ${IMG_MIN_WIDTH}px)`,
    maxWidth: `min(100%, ${width}px)`,
    maxHeight: `min(${IMG_MAX_HEIGHT}px, ${height}px)`,
  };

  return (
    <div className={className} style={style}>
      {image ? (
        <div className="picture picture-ratio" style={wrapperStyle}>
          {!loaded && (
            <img
              className="picture-placeholder"
              alt=""
              src={image.links.placeholder_30x30.href}
              aria-hidden="true"
              style={style}
            />
          )}
          <picture>
            {sources.map((srcSet, i) => (
              <Source
                key={i}
                links={image.links}
                srcSet={srcSet}
                type={imageType}
              />
            ))}
            <img
              src={image.links[defaultSize].href || image.href}
              alt={alt}
              loading="lazy"
              style={style}
              onLoad={() => setLoaded(true)}
            />
          </picture>
        </div>
      ) : (
        <Placeholder width="100%" />
      )}
    </div>
  );
};

export default Image;
