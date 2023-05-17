import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = ({ currentSelectedPage, children }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: "Get Started",
      href: "#",
      icon: HomeIcon,
      current: currentSelectedPage === "Get Started",
    },
    {
      name: "Library",
      href: "#",
      icon: UsersIcon,
      current: currentSelectedPage === "Library",
    },
    {
      name: "Profile",
      href: "#",
      icon: FolderIcon,
      current: currentSelectedPage === "Profile",
    },
  ];

  const teams = [
    {
      id: 1,
      name: "AI Music (beta)",
      href: "#",
      initial: "🎵",
      current: currentSelectedPage === "AI Music (beta)",
    },
    {
      id: 2,
      name: "AI Lyrics",
      href: "#",
      initial: "✏️",
      current: currentSelectedPage === "AI Lyrics",
    },
  ];

  const MobileSidebar = () => {
    return (
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
              <div className="absolute top-0 right-0 p-2 -mr-12">
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
              {/* Mobile sidebar content */}
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "h-6 w-6 mr-4"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    );
  };

  const SidebarContent = () => {
    return (
      <div className="flex flex-col h-0 flex-1 overflow-y-auto">
        <div className="flex-1 flex flex-col">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-300"
                      : "text-gray-400 group-hover:text-gray-300",
                    "mr-3 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    );
  };

  const Sidebar = () => {
    return (
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <SidebarContent />
          </div>
        </div>
      </div>
    );
  };

  const Navbar = () => {
    return (
      <div className="flex-shrink-0">
        <div className="flex h-16 bg-gray-900">{/* Navbar content */}</div>
      </div>
    );
  };

  const MainContent = () => {
    return (
      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="py-6">
          <div className="px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Page Title</h1>
          </div>
          <div className="px-4 sm:px-6 md:px-8">
            {/* Your content */}
            {children}
          </div>
        </div>
      </main>
    );
  };

  return (
    <>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <MobileSidebar />
        <Sidebar />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <Navbar />
          <MainContent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
