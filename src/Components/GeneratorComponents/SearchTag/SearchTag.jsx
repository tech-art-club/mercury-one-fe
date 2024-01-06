import styles from './SearchTag.module.css';

const SearchTag = ({ content, titleFieldPath, addTag }) => {
  return (
    <div
      className={styles.tag}
      key={content.id}
      onClick={(e) => addTag(content)}
    >
      {content[titleFieldPath]}
    </div>
  );
};

export default SearchTag;
