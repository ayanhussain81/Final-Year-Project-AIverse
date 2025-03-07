import Navigation from 'components/common/Navigation';
import SectionDivider from 'components/common/SectionDivider';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import TextLogo from 'components/common/logo/TextLogo';
import NormalSearchBar from 'components/common/searchBar/NormalSearchBar';
import { Link } from 'react-scroll';
// import Navigation from "../../common/Navigation";
// import SectionDivider from "../../common/SectionDivider";
// import OutlinedButton from "../../common/buttons/OutlinedButton";
// import TextLogo from "../../common/logo/TextLogo";
// import NormalSearchBar from "../../common/searchBar/NormalSearchBar";

export default function MobileMenu({
  isMobileMenuVisible,
  setIsMobileMenuVisible,
  offCanvasExtraClasses,
  offCanvasBackdropExtraClasses,
  sidebarRef,
  handleLogout,
  menuItems,
  user,
}) {
  return (
    <>
      {/* className={`${sidebarExtraClasses} absolute right-0 top-0 z-40 min-h-screen transition-transform duration-1000 ${isMobileMenuVisible ? "translate-x-0" : "translate-x-full min-[600px]:translate-x-96"}`} */}
      <aside
        ref={sidebarRef}
        id="mobile-menu"
        aria-label="Mobile menu"
        aria-hidden={!isMobileMenuVisible}
        className={`fixed top-0 right-0 bottom-0 z-40 | p-4 | bg-neutral-100 | border-l border-solid border-neutral-400 | w-full min-[600px]:w-96 | ${
          isMobileMenuVisible ? 'visible transform-none' : 'invisible translate-x-full min-[600px]:translate-x-96'
        } | transition-all duration-300 | ${offCanvasExtraClasses}`}
      >
        <div className="py-4 space-y-10">
          {/* logo */}
          <TextLogo extraClasses="pr-10" />

          {/* navigation */}
          <Navigation ariaLabel="menubar navigation" navExtraClasses="" ulExtraClasses="flex flex-col gap-3">
            {[
              ['Marketplace', 'marketplace', -40],
              ['Resource', 'resource', -80],
              ['About', 'about'],
              ['Pricing', 'pricing'],
            ].map(([navItem, url, offset], index) => (
              <li key={index} className="">
                <Link
                  key={navItem}
                  onClick={() => setIsMobileMenuVisible(false)}
                  activeClass="bg-primary text-neutral-100 hover:bg-primary/90"
                  to={url}
                  spy={true}
                  smooth={true}
                  offset={offset}
                  duration={500}
                  className="block w-full py-3 pl-3 cursor-pointer font-medium rounded-full hover:bg-neutral-300 transition-all"
                >
                  {navItem}
                </Link>
              </li>
            ))}
          </Navigation>
        </div>

        <SectionDivider sectionDividerExtraClasses="py-4 pl-3" borderExtraClasses="border-t" />

        <div className="py-4 space-y-5">
          {/* search bar */}
          <NormalSearchBar />

          {/* buttons */}
          <div className="flex flex-wrap justify-between items-center gap-5">
            {!user?.tokens ? (
              <OutlinedButton type="button" extraClasses="grow | px-10 py-4 font-semibold bg-neutral-100 leading-[100%]">
                Get Started
              </OutlinedButton>
            ) : (
              <>
                {menuItems.map((item) => {
                  return (
                    <OutlinedButton
                      type="button"
                      extraClasses="grow | px-10 py-4 font-semibold bg-neutral-100 leading-[100%]"
                    >
                      {item.name}
                    </OutlinedButton>
                  );
                })}
                <OutlinedButton
                  type="button"
                  extraClasses="grow | px-10 py-4 font-semibold bg-neutral-100 leading-[100%]"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </OutlinedButton>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* backdrop effect */}
      <div
        className={`fixed top-0 left-0 z-30 | bg-neutral-900 w-screen h-screen | ${
          isMobileMenuVisible ? 'visible opacity-50' : 'invisible opacity-0 overflow-hidden'
        } | transition-all duration-300 | ${offCanvasBackdropExtraClasses}`}
      >
        <span className="sr-only">backdrop effect when mobile menu offCanvas opens</span>
      </div>
    </>
  );
}
