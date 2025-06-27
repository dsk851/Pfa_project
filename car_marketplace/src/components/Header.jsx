import React, { useState } from "react";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

function Header() {
  const { user, isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="px-10 mx-auto ">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to={"/"} onClick={closeMobileMenu}>
            <img
              src="/assets/logo.svg"
              alt="logo"
              width={30}
              height={20}
              className="hover:scale-105 transition-transform"
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to={"/"} className="relative group">
              <span className="font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
                Home
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link to={"/search"} className="relative group">
              <span className="font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
                Search
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link to={"/listing"} className="relative group">
              <span className="font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
                Listing
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {isSignedIn && (
              <Link to={"/profil?tab=inbox"} className="relative group">
                <span className="font-medium text-gray-700 hover:text-gray-900 transition-colors py-2">
                  Inbox
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
            )}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <UserButton
                  className="focus:outline-none"
                  showName={true}
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "shadow-lg border border-gray-200",
                    },
                  }}
                />
                <Link to={"/profil"}>
                  <Button
                    size="sm"
                    className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    My Listing
                  </Button>
                </Link>
              </>
            ) : (
              <SignInButton mode="modal" forceRedirectUrl="/">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-4 bg-white/95 backdrop-blur-md">
            <Link
              to={"/"}
              className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            <Link
              to={"/search"}
              className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              onClick={closeMobileMenu}
            >
              Search
            </Link>

            <Link
              to={"/listing"}
              className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              onClick={closeMobileMenu}
            >
              Listing
            </Link>

            {isSignedIn && (
              <Link
                to={"/profil?tab=inbox"}
                className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={closeMobileMenu}
              >
                Inbox
              </Link>
            )}

            {/* Actions Mobile */}
            <div className="px-4 pt-4 border-t border-gray-100 space-y-3">
              {isSignedIn ? (
                <>
                  <div className="flex items-center space-x-3 py-2">
                    <UserButton
                      className="focus:outline-none"
                      showName={true}
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                          userButtonPopoverCard:
                            "shadow-lg border border-gray-200",
                        },
                      }}
                    />
                  </div>
                  <Link to={"/profil"} onClick={closeMobileMenu}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                      My Listing
                    </Button>
                  </Link>
                </>
              ) : (
                <SignInButton mode="modal" forceRedirectUrl="/">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
