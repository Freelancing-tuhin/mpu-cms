import { useContext, useState } from 'react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from 'src/context/authContext/AuthContext';

const AuthLogin = () => {
  const { login }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault(); // prevents page reload
    console.log({
      username,
      password,
      rememberMe,
    });
    if (username === 'Admin' && password === '1234') {
      login({
        username,
      });
      navigate('/');
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          id="username"
          type="text"
          sizing="md"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="userpwd" value="Password" />
        </div>
        <TextInput
          id="userpwd"
          type="password"
          sizing="md"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-between my-5">
        <div className="flex items-center gap-2">
          <Checkbox
            id="accept"
            className="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Label htmlFor="accept" className="opacity-90 font-normal cursor-pointer">
            Remember this Device
          </Label>
        </div>
      </div>

      <Button type="submit" color={'primary'} className="rounded-md w-full">
        Sign in
      </Button>
    </form>
  );
};

export default AuthLogin;
