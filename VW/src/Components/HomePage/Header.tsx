import React, { useContext, useEffect, useState } from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { alignLeft } from 'react-icons-kit/feather/alignLeft'
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
        <Container>
          <div style={{ color: Theme.primary, cursor: "pointer" }}>
            <Icon icon={alignLeft} size={32} />
          </div>
          <div style={{cursor: "pointer"}}>
            <Logo src={HeaderLogo} onClick={() => navigate("/home")} />
          </div>
          <IconsWrapper>
            <IconContainer
              style={{ cursor: "pointer" }}
              onClick={() => toggleSearchBox()}
            >
              {openSearch && !onSearchPage ? (
                <div style={{ color: Theme.primary }}><Icon icon={x} size={28} /></div>
              ) : (
                <div style={{ color: Theme.primary, fontSize: "24px" }}><Icon icon={search} size={28} /></div>
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
          </IconsWrapper>
        </Container>
        {true &&
        <NavContainer>
          {HeaderConfig.map((item) => {
            return (
              <NavigationLink key={item.title} href={item.redirectTo}>
                {item.title}
              </NavigationLink>
            );
          })}
        </NavContainer>
        }
      </Wrapper>
      <Fade in={openSearch && !onSearchPage}>
        <SearchContainer>
          <SearchBoxContainer>
            {!onSearchPage &&
              <HomeSearchBox toggleSearchBox={toggleSearchBox} />
            }
          </SearchBoxContainer>
        </SearchContainer>
      </Fade>
    </>
  );
};

const Wrapper = styled.header`
  box-shadow: 0 2px 8px rgb(229 232 232 / 75%);
  position: fixed;
  top: 0;
  z-index: 99;
  padding: 12px 0;
  width: 100%;
  color: ${Theme.primaryText};
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  transition: max-height .3s ease-out;
`;

const Container = styled.div`
  display: flex;
  height: 75px;
  margin: 0 auto;
  width: 100%;
  max-width: 1500px;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
`;

const NavContainer = styled.div`
  display: flex;
  height: 75px;
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
  @media (max-width:480px) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 40px;
  object-fit: contain;
  padding-left: 10px;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin-right: 50px;
`;

const LinkWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  @media (max-width: 1000px) {
    width: auto;
  }
`;

const NavigationLink = styled.a`
  color: ${Theme.primary};
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  opacity: 1;
  transition: 0.2s ease-in-out all;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    background-color: #166af2;
    left: 0;
    bottom: -5px;
    opacity: 0;
    transition: opacity .2s ease;
  }
  &:hover {
    color: #166af2;   
    &::after {
      opacity: 1;
    } 
  }
`;

const Divider = styled.div`
  height: 50px;
  border-right-width: 2px;
  width: 1px;
  height: 48px;
  background: #e5e8e8;
  @media (max-width:1000px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 220px;
  box-shadow: 0px 6px 16px rgba(229, 232, 232, 0.75);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  background-color: white;
  justify-content: center;
  z-index: 5;
  position: fixed;
    @media (max-width: 480px) {
    height: 100px;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.button`
background: none;
border: 0px;
transition: 0.2s ease-in-out all;
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
  display: flex;
  align-items: center;
  transition: 0.2s ease-in-out all;

`

const SearchBoxContainer = styled.div`
  width: 50%;
  margin-top: 100px;
  max-width: 800px;
  min-width: 500px;
  @media (max-width: 480px) {
    min-width: 80vw;
    margin-top: 0;
  }
`;


const ProfileAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 24px;
  object-fit: cover;
`

export default Header;
