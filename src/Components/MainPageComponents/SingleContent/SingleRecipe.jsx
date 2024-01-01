import styles from './SingleRecipe.module.css';

const SingleRecipe = ({ content, showRecipe }) => {
  return (
    <div
      key={content.id}
      className={styles.content}
      onClick={(e) => showRecipe(content.id)}
    >
      {content.title}
    </div>
  );
};

export default SingleRecipe;
