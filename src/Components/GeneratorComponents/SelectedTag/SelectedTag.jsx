import { RxCross2 } from 'react-icons/rx';
import styles from './SelectedTag.module.css';

const SelectedTag = ({ content, titleFieldPath, removeTag }) => {
  return (
    <div className={styles.activeTag} key={content.id}>
      {content[titleFieldPath]}
      <RxCross2
        className={styles.removeActiveTagBtn}
        onClick={(e) => removeTag(content)}
      />
    </div>
  );
};

export default SelectedTag;
