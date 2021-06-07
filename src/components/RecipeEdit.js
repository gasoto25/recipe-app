import React, { useContext } from 'react';
import { RecipeContext } from '../components/App';
import RecipeIngredientEdit from './RecipeIngredientEdit';
import uuidv4 from 'uuid/dist/v4';

export default function RecipeEdit({ recipe }) {
	const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

	const handleChange = (changes) => {
		handleRecipeChange(recipe.id, { ...recipe, ...changes });
	};

	const handleIngredientChange = (id, ingredient) => {
		const newIngredients = [...recipe.ingredients];
		const index = newIngredients.findIndex(
			(ingredient) => ingredient.id === id
		);
		newIngredients[index] = ingredient;
		handleChange({ ingredients: newIngredients });
	};

	const handleIngredientAdd = () => {
		const newIngredient = {
			id: uuidv4(),
			name: '',
			amount: '',
		};
		handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
	};

	const handleIngredientDelete = (id) => {
		handleChange({
			ingredients: recipe.ingredients.filter(
				(ingredient) => ingredient.id !== id
			),
		});
	};

	return (
		<div className='recipe-edit'>
			<div className='recipe-edit-remove'>
				<button
					onClick={() => handleRecipeSelect(undefined)}
					className='btn recipe-edit-remove-button'
				>
					&times;
				</button>
			</div>
			<div className='recipe-edit-input-grid'>
				<label className='recipe-edit-label' htmlFor='name'>
					Name:
				</label>
				<input
					className='recipe-edit-input'
					type='text'
					name='name'
					id='name'
					value={recipe.name}
					onChange={(e) => handleChange({ name: e.target.value })}
				/>
				<label className='recipe-edit-label' htmlFor='cookTime'>
					Cook Time:
				</label>
				<input
					className='recipe-edit-input'
					type='text'
					name='cookTime'
					id='cookTime'
					value={recipe.cookTime}
					onChange={(e) => handleChange({ cookTime: e.target.value })}
				/>
				<label className='recipe-edit-label' htmlFor='servings'>
					Servings:
				</label>
				<input
					className='recipe-edit-input'
					type='number'
					min='1'
					name='servings'
					id='servings'
					value={recipe.servings}
					onChange={(e) =>
						handleChange({ servings: parseInt(e.target.value) || '' })
					}
				/>
				<label className='recipe-edit-label' htmlFor='instructions'>
					Instructions:
				</label>
				<textarea
					className='recipe-edit-input'
					name='instructions'
					id='instructions'
					value={recipe.instructions}
					onChange={(e) => handleChange({ instructions: e.target.value })}
				/>
			</div>
			<br />
			<label className='recipe-edit-label'>Ingredients:</label>
			<div className='recipe-edit-ingredient-grid'>
				<div>Name</div>
				<div>Amount</div>
				<div></div>
				{recipe.ingredients.map((ingredient) => (
					<RecipeIngredientEdit
						key={ingredient.id}
						ingredient={ingredient}
						handleIngredientChange={handleIngredientChange}
						handleIngredientDelete={handleIngredientDelete}
					/>
				))}
			</div>
			<div className='recipe-edit-add-ingredient'>
				<button onClick={() => handleIngredientAdd()} className='btn btn-dark'>
					Add ingredient
				</button>
			</div>
		</div>
	);
}
