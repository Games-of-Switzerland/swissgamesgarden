import dynamic from 'next/dynamic';

const opts = {ssr: false};
const Placeholder1 = dynamic(
  () => import('svg/placeholders/placeholder1.svg'),
  opts
);
const Placeholder2 = dynamic(
  () => import('svg/placeholders/placeholder2.svg'),
  opts
);
const Placeholder3 = dynamic(
  () => import('svg/placeholders/placeholder3.svg'),
  opts
);
const Placeholder4 = dynamic(
  () => import('svg/placeholders/placeholder4.svg'),
  opts
);

const Placeholder = props => {
  const placeholders = [Placeholder1, Placeholder2, Placeholder3, Placeholder4];
  const rand = Math.floor(Math.random() * 4);
  const Component = placeholders[rand];
  return <Component {...props} />;
};
export default Placeholder;
