import { FaBars, FaCartPlus,FaSearch } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';


export const Nav = styled.nav`
  background: #008848;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  width: 100%;
  z-index: 10;
`;

export const NavLinkImg = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
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
    padding-top: 5px;
  }
`;

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
  color: #fff;
  &:hover {
    color: #fff;
  }
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

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
  &:hover {
    color: #f8f8f8;
  }
`;
