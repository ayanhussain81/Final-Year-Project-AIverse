import { useEffect, useState } from 'react';
import Navigation from 'components/common/Navigation';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import TextLogo from 'components/common/logo/TextLogo';
import { motion } from 'framer-motion';
import useOffCanvas from 'hooks/useOffCanvas';
import { Link, NavLink } from 'react-router-dom';

import HamburgerButton from './HamburgerButton';
import MobileMenu from './MobileMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { userMenuItems } from './static/data';
import UserMenu from 'components/menu/UserMenu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/auth.js';

export default function Header() {
  const { hamburgerToggle, isMobileMenuVisible, setIsMobileMenuVisible, hamburgerRef, sidebarRef } = useOffCanvas();
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const { tokens, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      aria-label="header"
      className={`fixed border-b-0 top-0 left-0 z-10 | w-full | border-neutral-400 | before:content-[''] before:absolute before:inset-0 before:-z-10 ${
        scrollPosition < 50 && location.pathname === '/'
          ? 'bg-transparent'
          : 'before:bg-neutral-100/80 before:backdrop-blur-3xl'
      } `}
    >
      <div className="container tablet:px-10 laptop:px-20 | py-7">
        {/* navbar main elements */}
        <div className="max-[1360px]:relative | flex items-center justify-between">
          {/* logo */}
          <Link to="/">
            <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <TextLogo extraClasses="pr-10" />
            </motion.div>
          </Link>

          <div className="grow | flex items-center max-[899px]:hidden">
            {/* navigation for larger devices */}

            <div className="grow justify-end | flex items-center gap-5">
              <Navigation
                ariaLabel="header navigation"
                navExtraClasses="pl-5 border-l border-solid border-neutral-400 | max-[899px]:hidden"
                ulExtraClasses="flex items-center gap-3"
              >
                {[
                  ['Home', '/', -40],
                  ['Marketplace', '/marketplace', -40],
                  ['Resource', 'resource', -80],
                  // ['About', 'about'],
                  ['Pricing', '/pricing'],
                ].map(([navItem, url, offset], index) => (
                  <li key={index}>
                    <NavLink
                      active
                      to={url}
                      spy={true}
                      smooth={true}
                      offset={offset}
                      duration={500}
                      className={({ isActive }) => {
                        let classes =
                          'cursor-pointer font-medium px-5 py-2 rounded-full hover:bg-neutral-300 transition-all';
                        if (isActive) return `${classes} bg-primary text-neutral-100 hover:bg-primary/90`;
                        return classes;
                      }}
                    >
                      {navItem}
                    </NavLink>
                  </li>
                ))}
              </Navigation>
              {/* buttons */}
              {tokens ? (
                <UserMenu handleLogout={handleLogout} user={user} menuItems={userMenuItems} />
              ) : (
                <OutlinedButton
                  type="button"
                  extraClasses="px-4 py-3 font-semibold bg-inherit leading-[100%]"
                  onClick={() => navigate('/auth/sign-in')}
                >
                  Get Started
                </OutlinedButton>
              )}
            </div>
          </div>

          {/* hamburger button for smaller devices */}
          <HamburgerButton
            hamburgerRef={hamburgerRef}
            hamburgerToggle={hamburgerToggle}
            isMobileMenuVisible={isMobileMenuVisible}
            buttonExtraClasses="min-[900px]:hidden"
          />
        </div>
      </div>

      {/* MobileMenu for smaller devices */}
      <MobileMenu
        isMobileMenuVisible={isMobileMenuVisible}
        setIsMobileMenuVisible={setIsMobileMenuVisible}
        sidebarRef={sidebarRef}
        offCanvasExtraClasses="min-[900px]:hidden"
        offCanvasBackdropExtraClasses="min-[900px]:hidden"
        user={user}
        handleLogout={handleLogout}
        menuItems={userMenuItems}
      />
    </header>
  );
}
