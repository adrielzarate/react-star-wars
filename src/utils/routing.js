import { Route, Routes } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '@nextui-org/react/loading'
import { AuthenticationGuard } from './auth/authentication-guard';
import { Auth } from './auth/auth';
import Row from '@nextui-org/react/row';
import { Characters } from '../views/characters';
import { Character } from '../views/character';
import { NotFound } from '../views/not-found';

export const Routing = () => {
    const { isLoading } = useAuth0();

    if (isLoading) return <Row justify="center" align="center" css={{ h: '700px' }}><Loading size="lg" /></Row>;

    return (
        <Routes>
            <Route path="/" element={<AuthenticationGuard component={Auth} />} />
            <Route
                path="/characters/"
                element={<AuthenticationGuard component={Characters} />}
            />
            <Route
                path="/characters/:id"
                element={<AuthenticationGuard component={Character} />}
            />
            <Route
                path="*"
                element={<AuthenticationGuard component={NotFound} />}
            />
        </Routes>
    );
}
