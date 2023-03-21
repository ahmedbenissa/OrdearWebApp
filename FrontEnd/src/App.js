import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Link,Route,Routes} from "react-router-dom"
import Navbar from './Components/NavbarComponent/NavBar';
import Formsxyz from './Components/SideBarComponent/RegisterForm.js';
import SuperAdminDashboard from './Pages/SuperAdmin/SuperAdminDash';
import AddResponsibleRestaurant from './FormsComponents/RegisterResponsibleRestaurant';
import LoginResp_res from './FormsComponents/Login_as_restaurant_owner';
import RestaurantownerDashboard from './Pages/Responsibles/RestaurantResponsibleDash';
import AddExecutor from './Pages/Responsibles/AddExecutor';
import Sign_In from './FormsComponents/SignIn';
import ForgotPasswordResponsible from './FormsComponents/ForgotPasswordResponsible';
import RequestForgotPasswordResponsible from './FormsComponents/RequestForgotPasswordResponsible';
import SignUpSuperAdmin from './FormsComponents/SignUpSuperAdmin';
import Login_SuperAdmin from './FormsComponents/LoginAsSuperAdmin';
import AddUser from './Pages/SuperAdmin/AddUser';
import ViewProfile from './Pages/General/ViewProfile';
import EditProfile from './Pages/General/EditProfile';
import ViewProfileA from './Pages/SuperAdmin/ViewUser';
import EditProfileA from './Pages/SuperAdmin/EditUser';
import LoginClient from './Pages/Customer/LoginClient';
import SignUpCustomer from './Pages/Customer/RegisterClient';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Link to='/login_as_restaurant_responsible?q=token' ></Link>
      <Link to='/login_as_franchise_responsible?q=token' ></Link>
      <Link to='/login_as_executor?q=token' ></Link>
      <Link to='/login_as_super-admin?q=token' ></Link>
      <Link to='/login_as_customer?q=token' ></Link>
      <Link to='/view_profile?q=id' ></Link>
      <Link to='/view_customer_profile?q=id' ></Link>
      <Link to='/edit_customer_profile?q=id' ></Link>
      <Link to='/Edit_profile?q=id' ></Link>
      <Link to='/forgot_password_customer?q=email'></Link>
      <Link to='/forgot_password_responsibler?q=email'></Link>
          <Routes>
          <Route exact path='/super_admin_dash' element={<SuperAdminDashboard></SuperAdminDashboard>}></Route>
          <Route exact path='/sign_up_super_admin'element={<SignUpSuperAdmin></SignUpSuperAdmin>}></Route>
          <Route exact path='/login_as_super-admin' element={<Login_SuperAdmin></Login_SuperAdmin>}></Route>
          <Route exact path='/register_rr' element={<AddResponsibleRestaurant></AddResponsibleRestaurant>}></Route>
          <Route exact path='/login_as_restaurant_responsible' element={<LoginResp_res></LoginResp_res>}></Route>
          <Route exact path='/restaurant_owner_dashboard' element={<RestaurantownerDashboard></RestaurantownerDashboard>}></Route>
          <Route exact path='/add_executor' element={<AddExecutor></AddExecutor>}></Route>
          <Route exact path="/sign_in" element={<Sign_In></Sign_In>}></Route>
          <Route exact path="/forgot_password_responsibler" element={<ForgotPasswordResponsible></ForgotPasswordResponsible>}></Route>
          <Route exact path='/request_responsible_password' element={<RequestForgotPasswordResponsible></RequestForgotPasswordResponsible>}></Route>
          <Route exact path='/add_user' element={<AddUser></AddUser>}></Route>
          <Route exact path='/view_profile' element={<ViewProfile></ViewProfile>}></Route>
          <Route exact path='/edit_profile' element={<EditProfile></EditProfile>}></Route>
          <Route exact path='/view_profile_for_admin' element={<ViewProfileA></ViewProfileA>}></Route>
          <Route exact path='/edit_profile_for_admin' element={<EditProfileA></EditProfileA>}></Route>
          <Route exact path='/customer_sign_up' element={<SignUpCustomer></SignUpCustomer>}></Route>
          <Route exact path='/login_as_customer' element={<LoginClient></LoginClient>}></Route>

          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
