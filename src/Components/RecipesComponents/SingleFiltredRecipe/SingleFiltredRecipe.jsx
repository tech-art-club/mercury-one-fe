import styles from './SingleFiltredRecipe.module.css';

const SingleFiltredRecipe = ({ content, showRecipe }) => {
  return (
    <div className={styles.content} onClick={(e) => showRecipe(content.Id)}>
      {content.Title}
    </div>
  );
};

export default SingleFiltredRecipe;
