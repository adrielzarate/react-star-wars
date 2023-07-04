import { Navbar, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import Image from '@nextui-org/react/image';
import { LogoutButton } from './logout-button';

export const Header = () => {
    const navigate = useNavigate();
    const redirectHome = () => {
        navigate('/characters?page=1');
    }

    return (
        <Navbar isBordered>
            <Navbar.Brand>
                <Button light auto animated={false} onPress={redirectHome}>
                    <Image
                        width={120}
                        height={55}
                        src={'/images/star-wars-logo.png'}
                        alt="Star Wars"
                    />
                </Button>
            </Navbar.Brand>
            <Navbar.Content>
                <Navbar.Item>
                    <LogoutButton />
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}
