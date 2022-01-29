import Link from 'next/link';

const SimpleList = ({title, items}) => {
  return items.length > 0 && (
    <div className='mb-16'>
      <h2 className='section-title'>{title}</h2>
      <div className='text-lg'>
        {items?.map(({title, field_path, id}) => (
          <div key={id}>
            <Link href={field_path}>
              <a
                className='text-white hover:text-opacity-75 transition transition:opacity duration-200'>
                {title}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export {SimpleList};
