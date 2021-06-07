import React, { useContext } from 'react';
import Recipe from './Recipe';
import { RecipeContext } from './App';

export default function RecipeList({ recipes }) {
	const { handleRecipeAdd } = useContext(RecipeContext);
	return (
		<>
			<div className='recipe-list'>
				<div>
					{recipes.map((recipe) => (
						<Recipe key={recipe.id} {...recipe} />
					))}
				</div>
				<div className='recipe-list__button-container'>
					<button className='btn btn-dark' onClick={handleRecipeAdd}>
						Add Recipe
					</button>
				</div>
			</div>
		</>
	);
}
