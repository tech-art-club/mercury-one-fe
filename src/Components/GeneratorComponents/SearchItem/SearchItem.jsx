import styles from './SearchItem.module.css';

const SearchItem = ({ content, titleFieldPath, addTag }) => {
  return (
    <div className={styles.searchItem} onClick={(e) => addTag(content)}>
      {content[titleFieldPath]}
    </div>
  );
};

export default SearchItem;
