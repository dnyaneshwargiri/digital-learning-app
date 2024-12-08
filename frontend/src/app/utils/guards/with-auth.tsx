import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthGuardProps {
  [key: string]: unknown;
}

const withAuth = (WrappedComponent: React.ComponentType<AuthGuardProps>) => {
  const AuthGuard = (props: AuthGuardProps) => {
    const router = useRouter();

    useEffect(() => {
      const token = sessionStorage.getItem('jwtToken');
      const isLoginRoute = router.pathname === '/login';

      if (!token && !isLoginRoute) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthGuard;
};
export default withAuth;
