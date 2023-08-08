import React, { useContext, useEffect, useState } from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { ic_menu } from 'react-icons-kit/md/ic_menu'
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
import {androidGlobe} from 'react-icons-kit/ionicons/androidGlobe'

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
    <Main>
      <Wrapper>
        <a href="/home">
          <Logo src={HeaderLogo} />
        </a>
        <RightWrapper>
          <LinkWrapper>
            {HeaderConfig.map((item) => {
              return (
                <NavigationLink key={item.title} href={item.redirectTo}>
                  {item.title}
                </NavigationLink>
              );
            })}
            <IconsWrapper>
              <IconContainer
                style={{ cursor: "pointer" }}
                onClick={() => toggleSearchBox()}
              >
                {openSearch && !onSearchPage ? (
                  <div><Icon icon={x} size={24} /></div>
                ) : (
                  <div><Icon icon={search} size={24} /></div>
                )}
              </IconContainer>
              <Icon style={{ 
                color: Theme.primary, marginLeft: "16px", marginTop: "4px", cursor: "pointer",
              }} 
              onClick={() => window.location.href = `https://demo-fresenius-de.netlify.app${window.location.pathname}`}
              className=""
              size={26} icon={androidGlobe}/>
              <ProfileIconContainer
                style={{ color: 'black', cursor: "pointer" }}
                aria-describedby={id}
                onClick={(event) => handleClick(event)}
              >
                <ProfileAvatar src={getProfile().profile} alt={'profile pic'} />
                <ProfileName>{getProfile().name.split(' ').slice(0, -1).join(' ')}</ProfileName>
              </ProfileIconContainer>
              <Icon style={{ 
                color: Theme.primary, marginRight: "16px", marginTop: "0px", 
              }} 
              className="hamburger--menu"
              size={32} icon={ic_menu} />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <ContextForm />
              </Popover>
            </IconsWrapper>
          </LinkWrapper>
        </RightWrapper>
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
    </Main>
  );
};

const Wrapper = styled.header`
  width: 100%;
  color: ${Theme.primaryText};
  display: flex;
  align-items: center;
  transition: all .3s ease-out;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
`;

const Main = styled.div`
padding: 25px 0;
position: fixed;
top: 0;
z-index: 99;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgb(229 232 232 / 75%);
`;

const Logo = styled.img`
  height: 30px;
  margin-left: 10px;
  @media (max-width:1000px) {
    height: 20px;
  }
`;

const RightWrapper = styled.div`
  display: flex;
`;

const LinkWrapper = styled.ul`
  display: flex;
  align-items: center;
`;

const NavigationLink = styled.a`
  color: #002967;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  opacity: 0.7;
  transition: 0.2s ease-in-out all;
  position: relative;
  &:hover {
    opacity: 1;
    &::after{
      content: "";
    }
  }
  &::after {
  position: absolute;
  bottom: -16px;
  left: calc(50% - 8px);
  width: 0;
  height: 0;
  opacity: 1;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid #002967;

    }
  margin-right: 20px;
    @media (max-width:1000px) {
    display: none;
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
  height: 150px;
  box-shadow: 0px 6px 16px rgba(229, 232, 232, 0.75);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  background-color: white;
  justify-content: center;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.button`
background: none;
border: 0px;
transition: 0.2s ease-in-out all;
color: #002967;
`

const ProfileName = styled.span`
font-size  : 16px;
font-weight: 400;
font-family: inherit;
margin-left: 15px;
text-overflow: ellipsis;
  @media (max-width:1000px) {
    display: none;
  }
`

const ProfileIconContainer = styled.button`
  background: none;
  border: 0px;
  margin: 0 20px;
  display: flex;
  align-items: center;
  transition: 0.2s ease-in-out all;

`

const SearchBoxContainer = styled.div`
  width: 50%;
  margin-top: 50px;
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
