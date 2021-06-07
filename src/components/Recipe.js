import React, { useContext } from 'react';
import IngredientList from './IngredientList';
import { RecipeContext } from './App';

export default function Recipe(props) {
	const { id, name, cookTime, servings, instructions, ingredients } = props;
	const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
	return (
		<div className='recipe card shadow-sm'>
			<div className='recipe-header'>
				<h3 className='recipe-title'>{name}</h3>
				<div className='btn-container'>
					<button
						className='btn btn-dark p-1 me-1 custom-btn'
						onClick={() => handleRecipeSelect(id)}
					>
						Edit
					</button>
					<button
						className='btn btn-outline-danger p-1 custom-btn'
						onClick={() => handleRecipeDelete(id)}
					>
						Delete
					</button>
				</div>
			</div>
			<hr />
			<div className='recipe-row'>
				<span className='recipe-label'>Cook Time: </span>
				<span className='recipe-value'>{cookTime}</span>
			</div>
			<div className='recipe-row'>
				<span className='recipe-label'>Servings </span>
				<span className='recipe-value'>{servings}</span>
			</div>
			<div className='recipe-row'>
				<span className='recipe-label'>Ingredients:</span>
				<div className='recipe-value'>
					<IngredientList ingredients={ingredients} />
				</div>
			</div>
			<div className='recipe-row'>
				<span className='recipe-label'>Instructions: </span>
				<div className='recipe-value recipe-instructions ms-3'>
					{instructions}
				</div>
			</div>
		</div>
	);
}
