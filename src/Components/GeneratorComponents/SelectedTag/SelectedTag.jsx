import { RxCross2 } from 'react-icons/rx';
import styles from './SelectedTag.module.css';

const SelectedTag = ({ content, removeTag }) => {
  console.log(content);
  return (
    <div className={styles.activeTag} key={content.id}>
      {content.value}
      <RxCross2
        className={styles.removeActiveTagBtn}
        onClick={(e) => removeTag(content)}
      />
    </div>
  );
};

export default SelectedTag;
