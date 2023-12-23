import styles from './SingleFilter.module.css';

const SingleFilter = ({ content }) => {
  return (
    <div key={content.id} className={styles.content}>
      {content.title}
    </div>
  );
};

export default SingleFilter;
