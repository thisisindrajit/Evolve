import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const UserMenu = (props) => {
  return (
    <Menu as="div" className="flex">
      <Menu.Button>
        <svg
          className="cursor-pointer h-6 md:h-8"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="39.115" cy="39.115" r="39.115" fill="#007367" />
          <mask
            id="mask0_11_335"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="79"
            height="79"
          >
            <circle cx="39.115" cy="39.115" r="39.115" fill="#C4C4C4" />
          </mask>
          <g mask="url(#mask0_11_335)">
            <ellipse
              cx="39.1157"
              cy="68.8424"
              rx="29.7274"
              ry="17.2106"
              fill="#89FFDD"
            />
          </g>
          <ellipse
            cx="39.1154"
            cy="33.2478"
            rx="14.0814"
            ry="14.0814"
            fill="#89FFDD"
          />
        </svg>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="fixed right-4 rounded-lg top-12 md:top-16 w-64 origin-top-right divide-y divide-white bg-gray-300 p-4 shadow-lg focus:outline-none"
          style={{
            background: "linear-gradient(to bottom, #218f8f, #1fbcbc)",
          }}
        >
          <div>
            <div className="flex flex-col mb-4">
              <div className="text-sm text-white dark:text-darkest-grey truncate font-bold">
                {props.userName}'s Menu
              </div>
            </div>
          </div>
          <div className="pt-2">
            <Menu.Item>
              <div className="text-sm cursor-pointer py-2 hover:px-2 transition-all hover:bg-white hover:text-black rounded-md">
                Feedback
              </div>
            </Menu.Item>
            <Menu.Item onClick={props.logout}>
              <div className="text-sm cursor-pointer py-2 hover:px-2 transition-all hover:bg-white hover:text-black rounded-md">
                Logout
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
