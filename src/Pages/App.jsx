import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../Components/Hocs/ProtectedRoute.jsx';
import Dashboard from './Main/Main.jsx';
import UserAccount from './UserAccount/UserAccount.jsx';
import Catalog from './Catalog/Catalog.jsx';
import Recipe from './Recipe/Recipe.jsx';
import Generator from './Generator/Generator.jsx';
import Diet from './Diet/Diet.jsx';
import RandomRecipe from './RandomRecipe/RandomRecipe.jsx';
import Basket from './Basket/Basket.jsx';
/* import Footer from '../Components/Footer/Footer.jsx'; */
import MainLayout from '../Layouts/MainLayout.jsx';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="recipe/:id" element={<Recipe />} />
            <Route path="recipes" Component={Catalog} />
            <Route
              path="generator"
              element={
                <ProtectedRoute>
                  <Generator />
                </ProtectedRoute>
              }
            />
            <Route path="diet" element={<Diet />} />
            <Route path="random_recipe" element={<RandomRecipe />} />
            <Route path="basket" element={<Basket />} />
            <Route
              path="account/*"
              element={
                <ProtectedRoute>
                  <UserAccount />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
