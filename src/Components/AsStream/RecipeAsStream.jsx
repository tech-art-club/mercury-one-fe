import styles from '../../Pages/Recipe/Recipe.module.css';
import React, { useEffect, useState } from 'react';
import parseRecipe from '../../Helpers/parseRecipe'
import TextWithTypingEffect from '../TextBoxes/TextWithTypingEffect'

const RecipeAsStream = ({ methods, events }) => {
    const [recipe, setRecipe] = useState({ Description: '', Title: '' });

    useEffect(() => {
        events((method, messageFromSignal) => {
            if (method === methods.ReciveRecipePart) {
                let recipeJson = parseRecipe(messageFromSignal)

                if (recipeJson !== false) {
                    console.log(recipeJson)
                    setRecipe(Object.assign({}, recipe, recipeJson))
                }
            }
        });
    }, [setRecipe]);

    return (
        <div className={styles.recipeContainer}>
            <div className={styles.title}><TextWithTypingEffect textToType={recipe.Title} /></div>
            <div className={styles.contentRow}>
                <div className={styles.imageContainer}>
                    <img src={recipe.ImageUrl} alt="img" />
                </div>
                <div className={styles.ingredients}>
                    <p style={{ alignSelf: 'flex-start' }}>Ingredients</p>
                    <div className={styles.servings}>servings: 1 + -</div>
                    {
                        Array.isArray(recipe.Products) ?
                            recipe.Products?.map((el, index) => (
                                <div className={styles.product} key={index}>
                                    <TextWithTypingEffect textToType={el} />
                                    <p>100gr</p>
                                </div>
                            )) : ''}
                </div>
            </div>
            <div className={styles.contentRow}>
                <div className={styles.contentColumn}>
                    <div className={styles.cuisine}>
                        Cuisine: {
                            Array.isArray(recipe.Cuisine) ?
                                recipe.Cuisine?.map((el, index) =>
                                    <span key={index}>
                                        <TextWithTypingEffect textToType={el} />
                                    </span>) : ''
                        }
                    </div>
                    <div className={styles.dishType}>
                        Dish type: {
                            Array.isArray(recipe.DishType) ?
                                recipe.DishType?.map((el, index) => 
                                <span key={index}>
                                    <TextWithTypingEffect textToType={el} />
                                    </span>) : ''
                        }
                    </div>
                    <div className={styles.diet}>
                        Diet: {
                            Array.isArray(recipe.Diet) ?
                                recipe.Diet?.map((el, index) => 
                                <span key={index}>
                                    <TextWithTypingEffect textToType={el} />
                                    </span>) : ''
                        }
                    </div>
                </div>
                <div className={styles.description}>
                    Description: <br />
                    <TextWithTypingEffect textToType={recipe.Description} />
                </div>
            </div>
            <div className={styles.cookingSteps}>
                {
                    Array.isArray(recipe.CookingSteps) ?
                        recipe.CookingSteps
                            ?.sort((a, b) => a.StepNumber - b.StepNumber)
                            .map((el) => (
                                <div key={el.id}>
                                    <div className={styles.step}>Step {el.StepNumber}</div>
                                    <div className={styles.stepDescription}>
                                        {el.Description? <TextWithTypingEffect textToType={el.Description} /> : ''}
                                    </div>
                                </div>
                            )) : ''}
            </div>
        </div>
    )
};

export default RecipeAsStream;