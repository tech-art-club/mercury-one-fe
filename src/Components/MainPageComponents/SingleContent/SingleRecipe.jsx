import styles from './SingleRecipe.module.css';

const SingleRecipe = ({ content }) => {
  return (
    <div key={content.id} className={styles.content}>
      {content.title}
    </div>
  );
};

export default SingleRecipe;
