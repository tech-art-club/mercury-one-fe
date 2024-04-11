import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import OrdersPage from '../Pages/UserAccount/OrdersPage';
import FavoriteRecipesPage from '../Pages/UserAccount/FavoriteRecipesPage';
import ViewedRecipesPage from '../Pages/UserAccount/ViewedRecipesPage';
import AddCustomRecipe from '../Pages/UserAccount/AddCustomRecipe/AddCustomRecipe';
const AccountLayout = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="favorite-recipes" element={<FavoriteRecipesPage />} />
        <Route path="viewed-recipes" element={<ViewedRecipesPage />} />
        <Route path="add-recipe" element={<AddCustomRecipe />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default AccountLayout;
