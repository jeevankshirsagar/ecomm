import {
  BoxArrowInRight,
  GeoAlt,
  Heart,
  Person,
  PersonPlus,
  Repeat,
  Telephone,
} from "@styled-icons/bootstrap";

// Import Material Ui components

import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ImageLoader from "~/components/Image";
import c from "./navbar.module.css";
import SearchBar from "./searchbar";
// import LanguageSwitcher from "~/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
// import { ImportContacts } from "@styled-icons/material";

const CartView = dynamic(() => import("./cartView"), { ssr: false });
const CategoryMenu = dynamic(() => import("./categoryMenu"), { ssr: false });

const NavBar = () => {
  const [hideTopBar, setHideTopBar] = useState(false);

  // Materil ui add
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Selecting session from global state
  const { session } = useSelector((state) => state.localSession);
  
  // Selecting settings from global state
  const { settingsData } = useSelector((state) => state.settings);
  const settings = useSelector((state) => state.settings);
  const { wishlist, compare } = useSelector((state) => state.cart);
  const [std, setStd] = useState(settingsData);
  const { t } = useTranslation();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    setStd(settingsData);
  }, [settingsData]);

  const router = useRouter();

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position >   110) {
      setHideTopBar(true);
    } else {
      setHideTopBar(false);
    }
  };
 

  const goToWishList = () => {
    if (session) {
      router.push("/profile?tab=1");
    } else {
      toast.warning("You need to login to create a Wishlist");
    }
  };

  const navItem = [
    {
      id: 1,
      name: t("home"),
      to: "/",
    },
    {
      id: 2,
      name: t("shop"),
      to: "/gallery",
    },
    // {
    //   id: 3,
    //   name: t("all_categories"),
    //   to: "/categories",
    // },
    {
      id:3,
      name:t("Mobile"),
      to: "/gallery?category=mobile"
    },
    {
      id:4,
      name:t("TV"),
      to: "/gallery?category=tv"
    },
    {
      id:5,
      name:t("Camera"),
      to: "/gallery?category=camera"
    },
    {
      id:6,
      name:t("NeckBands"),
      to: "/gallery?category=neckbands"
    },
    {
      id:7,
      name:t("Tripods"),
      to: "/gallery?category=tripods"
    },
    {
      id:8,
      name:t("Power Bank"),
      to: "/gallery?category=power-bank"
    },
    {
      id:9,
      name:t("Gimbals"),
      to: "/gallery?category=gimbals"
    },
    {
      id:10,
      name:t("EarPods"),
      to: "/gallery?category=earpods"
    },
    {
      id:11,
      name:t("Ipad"),
      to: "/gallery?category=ipad"
    },
  ];

  return (
    <>
      <nav
        className={`${c.nav} ${hideTopBar ? c.hide_top_bar : c.show_top_bar}`}
      >
        <div className={c.container}>
          <div className={c.start}>
            <div className={c.brand}>
              <Link href="/">
                {std.logo[0] && (
                  <ImageLoader
                    src={std.logo[0]?.url}
                    width={155}
                    height={44}
                    alt={std.name}
                  />
                )}
              </Link>
            </div>
          </div>
          <div className={c.center}>
            <SearchBar />
          </div>
          <div className={c.end}>
            <div onClick={goToWishList}>
              <Heart width={24} height={24} />
              <span>{wishlist || 0}</span>
              <p style={{ margin: '0' }}>{t("wishlist")}</p>
            </div>
            <CartView />
            {/* <Link href={"/compare"} passHref legacyBehavior>
              <div>                                                ---->    Hide compare button from Navbar
                <Repeat width={24} height={24} />
                <span>{compare.length || 0}</span>
                <p>{t("compare")}</p>
              </div>
            </Link> */}
            <Box className={c.profileBox} >
              <div onClick={handleOpenUserMenu} className={c.Account}>
                <IconButton onClick={handleOpenUserMenu} >
                  <Person width={25} height={25} /> 
                </IconButton>
                 <label>Account</label>
              </div>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {!session && (
                  <>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link href="/signup">
                        <Typography textAlign="center">
                          {t("Register")}
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link href="/signin">
                        <Typography textAlign="center">
                          {t("signin")}
                        </Typography>
                      </Link>
                    </MenuItem>
                  </>
                )}
                {session && (
                  <>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link href="/profile">
                        <Typography textAlign="center">
                          {session.user.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">{t("signout")}</Typography>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </div>
        </div>
        <hr />
        <div className={c.bottom_bar}>
          <CategoryMenu />
          <div className={c.nav_link}>
            <ul className={c.ul}>
              {navItem.map((item, index) => (
                <li className={c.list} key={index}>
                  <div className={c.item}>
                    <Link href={item.to}>{item.name}</Link>
                  </div>
                </li>
              ))}
              {session && (session.user.a || session.user.s.status) && (
                <li className={c.list}>
                  <div className={c.item}>
                    <Link href="/dashboard">{t("dashboard")}</Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className={c.track}>
            <Link href="/order-track">
              <GeoAlt width={18} height={18} />
              {t("track_order")}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(NavBar);