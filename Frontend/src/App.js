import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './customer/Components/Navbar/Navigation';
import CustomerRoutes from './Routers/CustomerRoutes';
import AdminRoutes from './Routers/AdminRoutes';
import NotFound from './Pages/Notfound';
import AdminPannel from './Admin/AdminPannel';
// import Routers from './Routers/Routers';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
function App() {
  const isAdmin = true;
  const handleSuccess = (response) => {
    // Xử lý thông tin người dùng sau khi đăng nhập thành công
    console.log('Logged in successfully:', response);
    console.log(jwtDecode(response.credential))
  };

  const handleFailure = (error) => {
    // Xử lý khi đăng nhập thất bại
    console.error('Login failed:', error);
  };
  return (
    <GoogleOAuthProvider
      clientId="156409993558-716kd0g7s83nht2hekpd3vvkmqbne265.apps.googleusercontent.com"

    >
      <div className="">
        <GoogleLogin
          useOneTap
          onSuccess={handleSuccess}
          onFailure={handleFailure}
        />
        <Routes>
          <Route path="/*" element={<CustomerRoutes />} />
          <Route path="/admin/*" element={<AdminPannel />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
