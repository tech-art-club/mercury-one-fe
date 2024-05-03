import SelectedTag from '../../Components/Tags/SelectedTag';

const CatalogTags = ({ content, removeTag }) => {
  return (
    <>
      {Object.keys(content).map((key, i) => (
        <div key={i} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {content[key].map((title, i) => (
            <SelectedTag
              key={i}
              content={{ key: key, value: title }}
              titleFieldPath={key}
              removeTag={removeTag}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default CatalogTags;
