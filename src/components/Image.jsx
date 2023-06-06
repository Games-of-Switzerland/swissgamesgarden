import {useState} from 'react';
import Placeholder from './Placeholder';

const skipFormats = ['gif'];

const Source = ({links, srcSet = [], type}) => {
  // Handle jpeg/jpg
  const typeOriginal = type;
  if (type === 'jpeg') {
    type = 'jpg';
  }

  const shouldRenderWebp = !skipFormats.includes(type);

  const srcSetString =
    srcSet.length > 1
      ? srcSet.map((src, i) => `${links[src].href} ${i + 1}x`).join(', ')
      : links[srcSet[0]].href;

  const regex = new RegExp(`\.${type}(?:(?:\\?.*)$|$)`, 'gi');

  const webpSrcSetString = srcSetString.replace(regex, '.webp');

  return (
    <>
      {/*{shouldRenderWebp && (*/}
      {/*  <source srcSet={webpSrcSetString} type="image/webp" />*/}
      {/*)}*/}
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

  return fromFileMIME || (fromHref && fromHref[1]) || 'jpg';
};

const Image = ({
  image,
  alt,
  sources = [],
  className,
  defaultSize = 'downscale_675x500',
}) => {
  const [loaded, setLoaded] = useState(false);
  const imageType = getImageType(image);

  return (
    <div className={className}>
      {image ? (
        <div className="picture">
          {!loaded && (
            <img
              className="picture-placeholder"
              alt=""
              src={image.links.placeholder_30x30.href}
              aria-hidden="true"
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
              onLoad={() => setLoaded(true)}
              className="w-full"
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
