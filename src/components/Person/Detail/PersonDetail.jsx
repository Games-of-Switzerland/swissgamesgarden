const PersonDetail = ({person}) => {
  const {title, body} = person;

  return (
    <>
      <div className="content-container text-white">
        <div style={{gridArea: 'main'}}>
          <h1 className="text-4xl font-semibold mb-4">{title}</h1>

          {/* DESCRIPTION */}
          {body && (
            <div
              className="mb-10"
              dangerouslySetInnerHTML={{__html: body.processed}}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PersonDetail;
