import Placeholder1 from 'svg/placeholders/placeholder1.svg';
import Placeholder2 from 'svg/placeholders/placeholder2.svg';
import Placeholder3 from 'svg/placeholders/placeholder3.svg';
import Placeholder4 from 'svg/placeholders/placeholder4.svg';
import {useState} from 'react';

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

  const regex = new RegExp(`\.${type}\?`, 'gi');

  const webpSrcSetString = srcSetString.replace(regex, '.webp?');

  return (
    <>
      <source srcSet={webpSrcSetString} type="image/webp" />
      <source srcSet={srcSetString} type={`image/${typeOriginal}`} />
    </>
  );
};

const Placeholder = props => {
  const placeholders = [Placeholder1, Placeholder2, Placeholder3, Placeholder4];
  const rand = Math.floor(Math.random() * 4);
  const Component = placeholders[rand];
  return <Component {...props} />;
};

const IMG_MIN_WIDTH = 330;

const getImageType = image => {
  if (!image) return null;

  let fromFileMIME = image.filemime?.replace('image/', '');
  const fromHref = image.href?.match(/\.(\w+)\??^/i);

  return fromFileMIME || fromHref;
};

const Image = ({image, alt, style, sources = [], ratio, className}) => {
  console.log(image);
  const [loaded, setLoaded] = useState(false);
  const imageType = getImageType(image);

  const {width, height} = image.meta;
  const imgRatio = height / width;

  const wrapperStyle = {
    '--ratio': `${(ratio || imgRatio) * 100}%`,
  };

  return (
    <div
      className={className}
      style={{minWidth: `min(100%, ${IMG_MIN_WIDTH}px)`}}
    >
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
              src={image.links.downscale_675x500.href || image.href}
              alt={alt}
              loading="lazy"
              style={{...style, minWidth: `min(100%, ${IMG_MIN_WIDTH}px)`}}
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
