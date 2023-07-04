import { useAuth0 } from '@auth0/auth0-react';
import Button from '@nextui-org/react/button';
import { LogoutIcon } from '../components/logout-icon';

export const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    return <Button auto bordered shadow color="warning" size="sm" icon={<LogoutIcon stroke={'yellow'} />} onClick={handleLogout}>Logout</Button>;
};
