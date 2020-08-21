import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const activeStyle = {
  color: '#fff',
  opacity: 1,
  borderBottom: '4px solid #ff872c',
};

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <div>
          <div>
            <NavLink exact to="/" activeStyle={activeStyle}>
              Listagem
            </NavLink>
          </div>
          <div>
            <NavLink to="/import" activeStyle={activeStyle}>
              Importar
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  </Container>
);

export default Header;
