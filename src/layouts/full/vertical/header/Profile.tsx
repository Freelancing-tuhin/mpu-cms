import { Icon } from '@iconify/react';
import { Badge, Dropdown } from 'flowbite-react';
import * as profileData from './Data';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { useContext } from 'react';
const Profile = () => {
  const { user, logout }: any = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Clears user data from context and localStorage
    window.location.href = '/login'; // Redirect to login page after logout
  };
  return (
    <div className="relative ">
      <Dropdown
        label=""
        className="w-screen sm:w-[200px] p-4 rounded-sm shadow-xl  mt-5 border border-gray-300"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="flex items-center gap-2 cursor-pointer group ">
            {/* Circle with 'A' */}
            <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              A
            </div>

            {/* Username */}
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Admin</span>

            {/* Chevron Down Icon */}
            <Icon
              icon="tabler:chevron-down"
              className="text-gray-500 group-hover:text-blue-600 transition duration-200"
              height={16}
            />
          </div>
        )}
      >
        <SimpleBar>
          <div
            onClick={handleLogout}
            className="ml-6 cursor-pointer rounded-md hover:bg-red-100 hover:text-red-500 px-3 py-2 "
          >
            Logout
          </div>
        </SimpleBar>
      </Dropdown>
    </div>
  );
};

export default Profile;
