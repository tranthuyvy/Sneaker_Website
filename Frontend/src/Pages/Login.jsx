import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const handleSuccess = (response) => {
        // Xử lý thông tin người dùng sau khi đăng nhập thành công
        console.log('Logged in successfully:', response);
    };

    const handleFailure = (error) => {
        // Xử lý khi đăng nhập thất bại
        console.error('Login failed:', error);
    };

    return <></>
};

export default Login;