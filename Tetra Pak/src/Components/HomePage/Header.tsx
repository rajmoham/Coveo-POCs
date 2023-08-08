import React, { useContext, useEffect, useState } from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import HomeSearchBox from "./HomeSearchBox";
import { x } from "react-icons-kit/feather/x";
import Fade from "@mui/material/Fade";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderConfig, HeaderLogo } from "../../config/HomeConfig";
import Popover from "@mui/material/Popover";
import ContextForm from "../CustomContext/ContextForm";
import { CustomContextContext } from "../CustomContext/CustomContextContext";
import HomeResultsSearchBox from "./HomeResultsSearchBox";

const Header: React.FC = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const navigate = useNavigate();
  const { getProfile } = useContext(CustomContextContext)
  const onSearchPage = window.location.pathname.includes("search");
  const toggleSearchBox = () => {
    if (onSearchPage) {
      const input = document.querySelector(".search-box input");
      if (input instanceof HTMLElement) {
        input.focus();
      }
      return;
    }
    setOpenSearch(!openSearch);
  };

  useEffect(() => {
    if (openSearch) {
      const input = document.querySelector(".home-search-box input");
      if (input instanceof HTMLElement) {
        input.focus();
      }
    }
  }, [openSearch]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Wrapper>
        <NavWrapper>
          <Logo src={HeaderLogo} onClick={() => navigate("/home")} />
          <NavLinks>
            {HeaderConfig.map((item) => {
              return (
                <NavigationLink key={item.title} href={item.redirectTo}>
                  {item.title}
                </NavigationLink>
              );
            })}
          </NavLinks>
          <RightWrapper>
            <IconContainer
              style={{ cursor: "pointer" }}
              onClick={() => toggleSearchBox()}
            >
              {openSearch && !onSearchPage ? (
                <div style={{ color: Theme.primary }}><Icon icon={x} size={24} /></div>
              ) : (
                <div style={{ color: Theme.primary }}><Icon icon={search} size={24} /></div>
              )}
            </IconContainer>
            <ProfileIconContainer
              style={{ color: 'black', cursor: "pointer" }}
              aria-describedby={id}
              onClick={(event) => handleClick(event)}
            >
              <ProfileAvatar src={getProfile().profile} alt={'profile pic'} />
              <ProfileName>{getProfile().name.split(' ').slice(0, -1).join(' ')}</ProfileName>
            </ProfileIconContainer>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <ContextForm />
            </Popover>
          </RightWrapper>
        </NavWrapper>
        <Fade in={openSearch && !onSearchPage}>
          <SearchContainer>
            <SearchBoxContainer>
              {!onSearchPage &&
                <HomeSearchBox toggleSearchBox={toggleSearchBox} />
              }
            </SearchBoxContainer>
          </SearchContainer>
        </Fade>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.header`
  box-shadow: 0 2px 8px rgb(229 232 232 / 75%);
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 80px;
  color: ${Theme.primaryText};
  background-color: #ffffff;
  display: flex;
  align-items: center;
  transition: max-height .3s ease-out;
`;

const NavWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1400px;
  display: flex;
  margin: 0 auto;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
`;

const Logo = styled.img`
  height: 100%;
  object-fit: contain;
  padding-left: 10px;
  cursor: pointer;
`;

const RightWrapper = styled.div`
  display: flex;
`;

const NavigationLink = styled.a`
  color: #023f88;
  text-decoration: none;
  font-size: 15px;
  font-weight: 400;
  margin: 0 32px;
  transition: 0.1s ease-in-out all;
  &:hover {
    color: #00bdf2;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 60px;
  top: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  background-color: white;
  justify-content: center;
`;
const IconContainer = styled.button`
background: none;
border: 0px;
width: 40px;
transition: 0.2s ease-in-out all;
  color: #00bdf2;
`

const ProfileName = styled.span`
font-size  : 16px;
font-weight: 400;
font-family: inherit;
margin-left: 15px;
color : ${Theme.excerpt};
text-overflow: ellipsis;
`


const ProfileIconContainer = styled.button`
  background: none;
  border: 0px;
  margin-left: 20px;
  width: 90px;
  display: flex;
  align-items: center;
  transition: 0.2s ease-in-out all;
  &:hover{
  transform: scale(0.95);
}
&:active{
  transform: scale(0.85);
}

`

const SearchBoxContainer = styled.div`
  width: 100%;
  max-width: 800px;
  min-width: 500px;
  @media (max-width: 480px) {
    min-width: 80vw;
  }
`;


const ProfileAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 24px;
  object-fit: cover;
`

export default Header;
