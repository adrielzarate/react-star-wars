import { useAuth0 } from '@auth0/auth0-react';
import Container from '@nextui-org/react/container';
import Spacer from '@nextui-org/react/spacer';
import Row from '@nextui-org/react/row';
import Col from '@nextui-org/react/col';
import Text from '@nextui-org/react/text';
import { Header } from '../components/header'

export const Layout = ({ children }) => {
    const { isAuthenticated } = useAuth0();
    return (
        <Container>
            <Row>
                <Col>{isAuthenticated && <Header />}</Col>
            </Row>
            <Row>
                <Col>
                    <Spacer y={1} />
                    {children}
                </Col>
            </Row>
            <Row>
                <Col align="center">
                    <Spacer y={3} />
                    <Text h6 size={15} >Adriel Zarate - 2023</Text>
                </Col>
            </Row>
        </Container>
    );
};
