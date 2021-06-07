import React from 'react';

export default function RecipeIngredientEdit(props) {
	const { ingredient, handleIngredientChange, handleIngredientDelete } = props;
	const handleChange = (changes) => {
		handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
	};
	return (
		<>
			<input
				className='recipe-edit-input'
				type='text'
				value={ingredient.name}
				onChange={(e) => handleChange({ name: e.target.value })}
			/>
			<input
				className='recipe-edit-input'
				type='text'
				value={ingredient.amount}
				onChange={(e) => handleChange({ amount: e.target.value })}
			/>
			<button
				onClick={() => handleIngredientDelete(ingredient.id)}
				className='btn btn-danger btn-close-ingredient'
			>
				&times;
			</button>
		</>
	);
}
