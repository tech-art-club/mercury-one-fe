import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './Main/Main.jsx';
import Auth from '../Pages/Auth/Auth.jsx';
import Recipes from './Recipes/Recipes.jsx';
import Recipe from './Recipe/Recipe.jsx';
import Generator from './Generator/Generator.jsx';
import Diet from './Diet/Diet.jsx';
import RandomRecipe from './RandomRecipe/RandomRecipe.jsx';
import Basket from './Basket/Basket.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import MainLayout from '../Layouts/MainLayout.jsx';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="recipe/:id" Component={Recipe} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="generator" element={<Generator />} />
            <Route path="diet" element={<Diet />} />
            <Route path="random_recipe" element={<RandomRecipe />} />
            <Route path="basket" element={<Basket />} />
            <Route path="auth" element={<Auth />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
