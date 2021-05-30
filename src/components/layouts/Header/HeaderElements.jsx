import { FaBars, FaCartPlus, FaSearch, FaUserCircle } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Sora&display=swap');
  * {
  font-family: 'Sora', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`

export const Nav = styled.nav`
  background: #008848;
  height: 80px;
  display: flex;
  justify-content: space-between;
  max-width: 1170px;
  margin: auto;
  z-index: 10;
`;

export const NavLinkImg = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
`
export const HeaderContainer = styled.div`
  background-color: #008848;
`

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #f8f8f8;
  }
`;

export const LinkItem = styled(Link)`
  color: #fff;
  &:hover {
    color: #f8f8f8;
  }
`


export const NavSearch = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const SearchInput = styled.input`
    height: 40px;
    width: 100%;
    border: none;
    outline: none;
    background: #fff;
    font-size: 18px;
    border-radius: 50px;
    padding: 0 60px 0 20px;
`

export const SearchBtn = styled.div`
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    height: 36px;
    width: 36px;
    color: #fff;
    background: #d42c2c;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    border-radius: 40px;
    cursor: pointer;
    &:hover {
      color: #a64141;
    }
    
`
export const SearchIcon = styled(FaSearch)`
`

export const Avatar = styled(FaUserCircle)`
  font-size:200%;
  color: #fff;
`

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const Cart = styled(FaCartPlus)`
  font-size:150%;
  width: 70px;
  color: #fff;
  &:hover {
    color: #fff;
  }
`
export const AmountContainer = styled.div`
  position: absolute;
  top: 18px;
  right: 28px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #d42c2c;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const TotalAmount = styled.div`
  color: #fff;
  margin-bottom: 0;
  font-size: 110%;
`

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;


export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

