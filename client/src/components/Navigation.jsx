import React, { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  DocumentPlusIcon,
  ShareIcon,
  HomeIcon,
  CloudArrowUpIcon,
  ArrowUpOnSquareIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const featuresMenu = [
  { name: 'Upload Files', href: '/', icon: CloudArrowUpIcon, description: 'Upload files to blockchain storage' },
  { name: 'View Files', href: '/#files', icon: Squares2X2Icon, description: 'View your uploaded files' },
  { name: 'Share Files', href: '/share', icon: ArrowUpOnSquareIcon, description: 'Share files with other users' },
];

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleNavigate = (href) => {
    if (href.includes('#')) {
      const id = href.split('#')[1];
      scrollToSection(id);
    }
  };

  return (
    <Disclosure 
      as="nav" 
      className={classNames(
        "fixed w-full z-50 transition-all duration-500",
        isScrolled 
          ? "bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-800/40" 
          : "bg-transparent"
      )}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button 
                  className="relative inline-flex items-center justify-center rounded-full p-2 text-gray-300 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-400 transition duration-300 ease-in-out"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo and brand */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white overflow-hidden shadow-lg shadow-indigo-600/20 group-hover:shadow-indigo-600/40 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 hidden sm:block group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-white transition-all duration-300">
                      Blockchain Drive
                    </span>
                  </Link>
                </div>

                {/* Desktop navigation */}
                <div className="hidden sm:ml-8 sm:flex sm:items-center space-x-1">
                  <Link
                    to="/"
                    className={classNames(
                      "text-gray-200 hover:text-white",
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                      location.pathname === "/" ? "bg-indigo-500/20 text-white ring-1 ring-indigo-500/30" : "hover:bg-gray-800/60"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      <HomeIcon className="h-4 w-4" />
                      Home
                    </span>
                  </Link>

                  {/* Features dropdown */}
                  <Popover 
                    className="relative" 
                    onMouseEnter={() => setActiveMenu(true)}
                    onMouseLeave={() => setActiveMenu(false)}
                  >
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            "text-gray-200 hover:text-white",
                            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                            "group inline-flex items-center gap-x-1 focus:outline-none",
                            (open || activeMenu) ? "bg-indigo-500/20 text-white ring-1 ring-indigo-500/30" : "hover:bg-gray-800/60"
                          )}
                        >
                          <span>Features</span>
                          <ChevronDownIcon
                            className={classNames(
                              "h-4 w-4 transition-transform duration-300",
                              (open || activeMenu) ? "rotate-180" : ""
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          show={open || activeMenu}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 mt-1 w-screen max-w-xs transform px-2 sm:px-0">
                            <div className="overflow-hidden rounded-2xl shadow-lg shadow-black/30 ring-1 ring-gray-700/50">
                              <div className="relative grid gap-1 bg-gray-900/95 backdrop-blur-xl p-2">
                                {featuresMenu.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => handleNavigate(item.href)}
                                    className="flex items-center rounded-xl p-3 transition duration-150 ease-in-out hover:bg-indigo-500/20 focus:outline-none hover:ring-1 hover:ring-indigo-500/30"
                                  >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600/90 to-purple-600/90 text-white">
                                      <item.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-sm font-medium text-white">{item.name}</p>
                                      <p className="text-xs text-gray-400">{item.description}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>

                  <Link
                    to="/share"
                    className={classNames(
                      "text-gray-200 hover:text-white",
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                      location.pathname === "/share" ? "bg-indigo-500/20 text-white ring-1 ring-indigo-500/30" : "hover:bg-gray-800/60"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      <ShareIcon className="h-4 w-4" />
                      Share
                    </span>
                  </Link>
                </div>
              </div>

              {/* User menu */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-1 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30">
                      <span className="sr-only">Open user menu</span>
                      <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-gray-900/95 backdrop-blur-xl py-1 shadow-lg ring-1 ring-gray-700/50 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-indigo-500/20' : '',
                              'block px-4 py-2 text-sm text-white transition-colors duration-150 hover:bg-indigo-500/20'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-indigo-500/20' : '',
                              'block px-4 py-2 text-sm text-white transition-colors duration-150 hover:bg-indigo-500/20'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-indigo-500/20' : '',
                              'block px-4 py-2 text-sm text-white transition-colors duration-150 hover:bg-indigo-500/20'
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 transform -translate-y-4"
            enterTo="opacity-100 transform translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 transform translate-y-0"
            leaveTo="opacity-0 transform -translate-y-4"
          >
            <Disclosure.Panel className="sm:hidden backdrop-blur-xl bg-gray-900/95">
              <div className="space-y-1 px-3 pb-3 pt-2">
                <Disclosure.Button as={Link} to="/" className="block w-full text-left rounded-xl px-3 py-2 text-base font-medium text-white hover:bg-indigo-500/20 transition-colors duration-300">
                  <span className="flex items-center gap-3">
                    <HomeIcon className="h-5 w-5" /> Home
                  </span>
                </Disclosure.Button>
                
                {featuresMenu.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    onClick={() => handleNavigate(item.href)}
                    className="block w-full text-left rounded-xl px-3 py-2 text-base font-medium text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-300"
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </span>
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Navigation;
