import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Recipe.module.css';
import { useEffect, useState } from 'react';
import { PieChart, pieChartDefaultProps } from 'react-minimal-pie-chart';

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};
const shiftSize = 1;

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async (recipeId) => {
      const res = await axios.get(
        `https://mercure-recipe-app-dev.azurewebsites.net/Recipes?id=${recipeId}`
      );
      return setRecipe(res.data);
    };

    if (id) {
      fetchRecipe(id);
    }
  }, [id]);

  return (
    id && (
      <div className={styles.recipeContainer}>
        <div className={styles.title}>{recipe.title}</div>
        <div className={styles.contentRow}>
          <div className={styles.imageContainer}>
            <img src={recipe.imageUrl} alt="img" />
          </div>
          <div className={styles.ingredients}>
            <p style={{ alignSelf: 'flex-start' }}>Ingredients</p>
            <div className={styles.servings}>servings: 1 + -</div>
            {recipe.products?.map((el) => (
              <div className={styles.product} key={el.id}>
                <div style={{ width: '50%' }}>{el.name}</div>
                <div style={{ width: '20%' }}>{el.quantity}</div>
                <div style={{ width: '30%', textAlign: 'end' }}>
                  {el.measurement}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.contentRow}>
          <div className={styles.contentColumn}>
            <div className={styles.cuisine}>
              Cuisine: {recipe.cuisines?.map((el) => el.title)}
            </div>
            <div className={styles.dishType}>
              Dish type: {recipe.dishTypes?.map((el) => el.title)}
            </div>
            <div className={styles.diet}>
              Diet: {recipe.diets?.map((el) => el.title)}
            </div>
          </div>
          <div className={styles.description}>
            Description: <br />
            {recipe.description}
          </div>
        </div>
        {typeof recipe.calorieContent === 'number' &&
          recipe.calorieContent > 0 && (
            <div style={{ height: '200px', display: 'flex' }}>
              <span>
                <PieChart
                  data={[
                    {
                      title: 'Proteins',
                      value: recipe.proteins,
                      color: '#0000FF',
                    },
                    {
                      title: 'Fats',
                      value: recipe.fats,
                      color: '#FFA500',
                    },
                    {
                      title: 'Carbohydrates',
                      value: recipe.carbohydrates,
                      color: '#6A2135',
                    },
                  ]}
                  radius={pieChartDefaultProps.radius - shiftSize}
                  segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                  label={({ dataEntry }) => dataEntry.value}
                  labelStyle={{
                    ...defaultLabelStyle,
                  }}
                />
              </span>
              <span>
                <div>100 grams of recipe</div>
                <div>calories: {recipe.calorieContent} kcal</div>
                <div>proteins: {recipe.proteins} grams</div>
                <div>fats: {recipe.fats} grams</div>
                <div>carbohydrates: {recipe.carbohydrates} grams</div>
              </span>
            </div>
          )}
        <div className={styles.cookingSteps}>
          {recipe.cookingSteps
            ?.sort((a, b) => a.stepNumber - b.stepNumber)
            .map((el) => (
              <div key={el.id}>
                <div className={styles.step}>Step {el.stepNumber}</div>
                <div className={styles.stepDescription}>{el.description}</div>
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default Recipe;
