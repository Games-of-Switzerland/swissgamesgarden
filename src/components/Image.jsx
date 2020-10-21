import Placeholder1 from 'svg/placeholders/placeholder1.svg';
import Placeholder2 from 'svg/placeholders/placeholder2.svg';
import Placeholder3 from 'svg/placeholders/placeholder3.svg';
import Placeholder4 from 'svg/placeholders/placeholder4.svg';

const Source = ({links, srcSet = [], type}) => {
  const srcSetString = srcSet
    .map((src, i) => `${links[src].href} ${i + 1}x`)
    .join(', ');

  const regex = new RegExp(`/\.${type}\?/gi`);

  const webpSrcSetString = srcSetString.replace(regex, '.webp?');

  return (
    <>
      <source srcSet={webpSrcSetString} type="image/webp" />
      <source srcSet={srcSetString} type="image/png" />
    </>
  );
};

const Placeholder = props => {
  const placeholders = [Placeholder1, Placeholder2, Placeholder3, Placeholder4];
  const rand = Math.floor(Math.random() * 4);
  const Component = placeholders[rand];
  return <Component {...props} />;
};

const Image = ({image, alt, sources = [], ratio}) => {
  const imageType = image && image.href.match(/\.(\w+)\??^/i);

  const styles = {};
  if (ratio) {
    styles['--ratio'] = `${ratio * 100}%`;
  }

  return (
    <>
      {image ? (
        <div className="picture" style={styles}>
          <img
            className="picture-placeholder"
            alt=""
            src={image.links.placeholder_30x30.href}
            aria-hidden="true"
          />
          <picture>
            {sources.map((srcSet, i) => (
              <Source
                key={i}
                links={image.links}
                srcSet={srcSet}
                type={imageType}
              />
            ))}
            <img src={image.href} alt={alt} loading="lazy" />
          </picture>
        </div>
      ) : (
        <Placeholder width="100%" />
      )}
    </>
  );
};

export default Image;
