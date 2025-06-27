import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router';

const SubLinks = ({ icon, title, subtitle, link }: any) => {
  return (
    <Link
      to={link}
      className="bg-white dark:bg-gray-800 group rounded-xl
       shadow dark:shadow-gray-900 p-4 flex cursor-pointer items-center gap-4 transition-all duration-700 ease-in-out hover:bg-blue-600 hover:shadow-lg shadow-gray-400"
    >
      <div className="bg-gray-100 p-3 rounded-full transition-all duration-700 ease-in-out group-hover:bg-white">
        <Icon
          icon={icon}
          className="text-3xl text-blue-600 transition-all duration-700 ease-in-out group-hover:text-blue-600"
        />
      </div>
      <div className="transition-all duration-700 ease-in-out">
        <h4 className="font-semibold text-gray-900 group-hover:text-white">{title}</h4>
        <p className="text-sm text-gray-500 group-hover:text-blue-100">{subtitle}</p>
      </div>
    </Link>
  );
};

export default SubLinks;
