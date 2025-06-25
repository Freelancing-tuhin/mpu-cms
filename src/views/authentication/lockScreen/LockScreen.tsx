import { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from 'src/context/authContext/AuthContext';

const REQUIRED_FIELDS_2 = ['']; // Add any required fields here

const LockScreen = () => {
  const { user }: any = useContext(AuthContext);

  const hasbankRequiredFields = REQUIRED_FIELDS_2.every((field) => user?.[field]);

  if (hasbankRequiredFields && user?.is_verified) {
    return null; // Don't show LockScreen if user is verified
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      {/* Lock Icon and Message */}
      <div className="flex flex-col items-center bg-black/60 p-6 rounded-xl shadow-lg">
        <p className="text-xl font-semibold text-white mb-2">🔒</p>
        <p className="text-xl font-semibold text-white mb-2">This content is locked</p>
        {/* Show appropriate message based on user status */}
        {!hasbankRequiredFields ? (
          <p className="text-sm text-gray-300">
            {' '}
            Please fill your bank details to access all features.
          </p>
        ) : !user?.is_verified ? (
          <p className="text-sm text-gray-300">Please wait until your account is verified.</p>
        ) : null}
        <Link
          to={'/apps/user-profile/profile'}
          className="bg-blue-500 text-white py-2 px-4 mt-3 rounded cursor-pointer"
        >
          Go back to profile page
        </Link>
      </div>
    </div>
  );
};

export default LockScreen;
