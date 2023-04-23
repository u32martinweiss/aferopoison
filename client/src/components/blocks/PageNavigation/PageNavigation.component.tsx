import { Link } from 'react-router-dom';

import { useAuth } from '../../../hooks/auth';

const PageNavigation = (): JSX.Element => {
  const { auth } = useAuth();

  return (
    <nav>
      <h2>Page Navigation</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {auth ? (
          <>
            <li>
              <Link to="/logout"> Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/register">Sign out</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default PageNavigation;
