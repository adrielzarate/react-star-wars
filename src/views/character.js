import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '@nextui-org/react/loading';
import { Grid, Card, Col, Row, Text } from '@nextui-org/react';
import { Species } from '../components/species';
import { World } from '../components/world';
import { Films } from '../components/films';

export const Character = () => {
    const { id } = useParams();
    const { status, error, data } = useQuery({
        queryKey: ['character', id],
        queryFn: () => axios.get(`https://swapi.dev/api/people/${id}/`),
    });

    if (status === 'loading') return <Row justify="center" align="center" css={{ h: '700px' }}><Loading size="lg" /></Row>;
    if (status === 'error') return <p>Error :(</p>;

    const { name, birth_year, species, homeworld, films } = data.data;

    return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={12} md={6}>
                <Card css={{ w: "100%", h: "700px" }}>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                        <Col>
                            <Text size={12} weight="bold" transform="uppercase">
                                Birth Year: {birth_year}
                            </Text>
                            <Text h2 color="white">
                                {name}
                            </Text>
                            <Text size={12} weight="bold">
                                From <World endpoint={homeworld} />
                            </Text>
                        </Col>
                    </Card.Header>
                    <Card.Body css={{ p: 0 }}>
                        <Col css={{
                            position: 'absolute',
                            zIndex: 1,
                            bottom: '70px',
                            left: '10px',
                        }}>
                            <Films endpoints={films} />
                        </Col>
                        <Card.Image
                            src={`../images/characters/${id}.jpg`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = '../images/characters/default.jpg';
                            }}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            css={{ opacity: '0.7' }}
                            alt={name}
                        />
                    </Card.Body>
                    <Card.Footer
                        isBlurred
                        css={{
                            position: "absolute",
                            bgBlur: "#0f111466",
                            borderTop: "$borderWeights$light solid $gray800",
                            bottom: 0,
                            zIndex: 1,
                        }}
                    >
                        <Row>
                            <Col>
                                <Row>
                                    <Col style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <Text css={{ marginRight: '10px' }}>Species</Text>
                                        <Species endpoints={species} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
        </Grid.Container>
    );
};