import { Link } from 'react-router';
const FullLogo = () => {
  return (
    <Link to={'/'}>
      <img
        src={
          'https://cdn.prod.website-files.com/68189bdce34bf42013f07647/682587f22f1d9b02f717620a_mpulogo.svg'
        }
        alt="logo"
        className="w-44"
      />
    </Link>
  );
};

export default FullLogo;
