import { useState } from "react";

export default function Navbar({ user }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTabDropdown, setShowTabDropdown] = useState(false);

  const tabs = [
    {
      name: "Mentors",
      href: "/app/mentors",
    },
    {
      name: "Mentees",
      href: "/app/mentees",
    },
    {
      name: "Match",
      href: "/app/match",
      condition: user?.user?.type === "mentee",
    },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <nav className="bg-gray-800 fixed w-full top-0">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setShowTabDropdown(!showTabDropdown)}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <a href="/app">
                <div className="flex flex-shrink-0 items-center text-center">
                  <img
                    src="/logo.png"
                    alt="match me logo"
                    className="w-10 rounded-lg"
                  />
                </div>
              </a>
              <div className="hidden sm:ml-6 sm:block my-auto">
                <div className="flex space-x-4">
                  {tabs.map(
                    (tab) =>
                      (tab.condition === undefined || tab.condition) && (
                        <a
                          key={tab.name}
                          href={tab.href}
                          className="text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          {tab.name}
                        </a>
                      )
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="/profile.jpg"
                      alt=""
                    />
                  </button>
                </div>

                {showDropdown && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <a
                      href="/user/profile"
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-600"
                      role="menuitem"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-600"
                      role="menuitem"
                      id="user-menu-item-2"
                      onClick={handleLogout}
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showTabDropdown && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="#"
                className="text-white block rounded-md px-3 py-2 text-base font-medium"
                aria-current="page"
              >
                {tabs.map(
                  (tab) =>
                    (tab.condition === undefined || tab.condition) && (
                      <a
                        key={tab.name}
                        href={tab.href}
                        className="text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        {tab.name}
                      </a>
                    )
                )}
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
