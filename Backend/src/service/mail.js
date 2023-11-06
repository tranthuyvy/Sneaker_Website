import nodemailer from 'nodemailer';
const path = require('path');
require('dotenv').config();
let mail = {}

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.mail,
        pass: process.env.password_mail
    }
});

mail.sendVerification = (userEmail, verification) => {
    let mailOptions = {
        from: `"CEO của cửa tiệm" <${process.env.mail}>`,
        to: userEmail,
        subject: 'Xin lại mật khẩu',
        text: 'Mã xác nhận của bạn là: ' + verification,
    };
    transporter.sendMail(mailOptions)
}

mail.sendSignUpSuccess = (userEmail) => {
    let mailOptions = {
        from: 'huynhthanhphong12a1',
        to: userEmail,
        subject: 'Chào mừng bạn đến với hệ thống kí túc xá Online',
        text: 'Chúc mừng bạn đã đăng ký tài khoản thành công',
    };
    transporter.sendMail(mailOptions)
}

mail.createCode = () => {
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += String(Math.floor(Math.random() * 10));
    }
    return result;
}

export default mail;