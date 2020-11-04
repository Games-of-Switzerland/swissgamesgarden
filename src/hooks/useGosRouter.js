import {useRouter} from 'next/router';
import queryString from 'query-string';

const useGosRouter = () => {
  const {asPath, ...rest} = useRouter();

  // Manage query ourselves, Next is doing some wrong things with arrays
  const query = queryString.parse(asPath.replace(/^\//, ''), {
    arrayFormat: 'bracket',
  });

  return {...rest, query};
};

export default useGosRouter;
