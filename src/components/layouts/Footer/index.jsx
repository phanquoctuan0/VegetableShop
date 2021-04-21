import React from 'react';
import {FaFacebookF,FaInstagram } from 'react-icons/fa';
import './styles.css'

function Footer() {
  let iconStyles = {fontSize: "150%"};
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className = 'footer-col'>
            <h4>Hỗ trợ khách hàng</h4>
              <ul>
                <li><p href="#">Các câu hỏi thường gặp</p></li>
                <li><p href="#">Gửi yêu cầu hỗ trợ</p></li>
                <li><p href="#">Hướng dẫn đặt hàng</p></li>
              </ul>
          </div>
          <div className = 'footer-col'>
            <h4>Về chúng tôi</h4>
              <ul>
                <li><p href="#">Giới thiệu</p></li>
                <li><p href="#">Tuyển dụng</p></li>
                <li><p href="#">Điều khoản sử dụng</p></li>
              </ul>
          </div>
          <div className = 'footer-col'>
            <h4>Hợp tác và liên kết</h4>
              <ul>
                <li><p href="#">Bán hàng cùng Vfresh</p></li>
                <li><p href="#">Quy chế bán hàng</p></li>
              </ul>
          </div>
          <div className = 'footer-col'>
            <h4>Theo dõi chúng tôi</h4>
              <div className = 'social-links'>
                <a><FaFacebookF style = {iconStyles}/></a>
                <a><FaInstagram style = {iconStyles}/></a>
              </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;