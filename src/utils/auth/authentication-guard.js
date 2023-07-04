import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '@nextui-org/react/loading'
import Row from '@nextui-org/react/row';

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Row justify="center" align="center" css={{ h: '700px' }}><Loading size="lg" /></Row>
  });

  return <Component />;
};
