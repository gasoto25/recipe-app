import { createContext, useState, useEffect } from 'react';
import uuidv4 from 'uuid/dist/v4';
import '../css/App.css';
import RecipeEdit from './RecipeEdit';
import RecipeList from './RecipeList';
import { sampleRecipes } from '../sampleRecipes';

export const RecipeContext = createContext();
const LOCAL_STORAGE_KEY = 'RecipeApp.recipes';

function App() {
	const [recipes, setRecipes] = useState(sampleRecipes);
	const [selectedRecipeId, setSelectedRecipeId] = useState();

	const selectedRecipe = recipes.find(
		(recipe) => recipe.id === selectedRecipeId
	);

	useEffect(() => {
		const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (recipeJSON !== null) setRecipes(JSON.parse(recipeJSON));
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
	}, [recipes]);

	const handleRecipeSelect = (id) => {
		setSelectedRecipeId(id);
	};

	const handleRecipeAdd = () => {
		const newRecipe = {
			id: uuidv4(),
			name: 'Enter Recipe Name',
			servings: 1,
			cookTime: '',
			instructions: '',
			ingredients: [
				{
					id: uuidv4(),
					name: '',
					amount: '',
				},
			],
		};
		setSelectedRecipeId(newRecipe.id);
		setRecipes([...recipes, newRecipe]);
	};

	const handleRecipeDelete = (id) => {
		if (selectedRecipeId != null && selectedRecipeId === id) {
			setSelectedRecipeId(undefined);
		}
		setRecipes(recipes.filter((recipe) => recipe.id !== id));
	};

	const handleRecipeChange = (id, recipe) => {
		const newRecipes = [...recipes];
		const index = newRecipes.findIndex((recipe) => recipe.id === id);
		newRecipes[index] = recipe;
		setRecipes(newRecipes);
	};

	const RecipeContextValue = {
		handleRecipeDelete,
		handleRecipeAdd,
		handleRecipeSelect,
		handleRecipeChange,
	};

	return (
		<RecipeContext.Provider value={RecipeContextValue}>
			<div className='App'>
				<RecipeList recipes={recipes} />
				{selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
			</div>
		</RecipeContext.Provider>
	);
}

export default App;
