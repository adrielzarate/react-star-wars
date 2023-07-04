import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Spacer from '@nextui-org/react/spacer';
import axios from 'axios';
import Table from '@nextui-org/react/table';
import { Species } from '../components/species';
import Pagination from '@nextui-org/react/pagination';

export const CharactersTable = ({ currentPage }) => {
    const navigate = useNavigate();
    const { status, error, data, isFetched } = useQuery({
        queryKey: ['characters', currentPage],
        queryFn: () => axios.get(`https://swapi.dev/api/people/?page=${currentPage}`),
        keepPreviousData: true
    });

    const charactersData = data?.data.results;
    const pages = data?.data.count ? Math.ceil(data.data.count / 10) : 1;
    if (status === 'error') return <p>Error :(</p>;

    const columns = [
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'birth_year',
            label: 'Year of Birth',
        },
        {
            key: 'species',
            label: 'Specie',
        },
    ];

    const chooseCharacter = (characterURL) => {
        const characterId = characterURL.split('/').at(-2);
        navigate(`${characterId}`);
    }

    const renderCell = (character, columnKey) => {
        const cellValue = character[columnKey];
        switch (columnKey) {
            case 'species':
                return <Species endpoints={character.species} />;
            default:
                return cellValue;
        }
    };

    const onPaginationChange = (pageNumber) => {
        navigate({
            pathname: '/characters',
            search: `?page=${pageNumber}`,
        });
    }

    return (
        <>
            <Table
                aria-label="Star Wars Characters List"
                selectionMode="single"
                onRowAction={(key) => chooseCharacter(key)}
                lined
                bordered
                shadow
                css={{ height: '560px' }}
            >
                <Table.Header columns={columns}>
                    {(column) => (
                        <Table.Column key={column.key}>{column.label}</Table.Column>
                    )}
                </Table.Header>
                {
                    (isFetched && charactersData?.length > 0)
                        ? (<Table.Body items={charactersData}>
                            {(character) => (
                                <Table.Row key={character.url}>
                                    {(columnKey) => <Table.Cell>{renderCell(character, columnKey)}</Table.Cell>}
                                </Table.Row>
                            )}
                        </Table.Body>)
                        : <Table.Body loadingState='loading' />
                }
            </Table>
            <Spacer y={1} />
            <Pagination bordered total={pages} color="warning" initialPage={currentPage} onChange={onPaginationChange} />
        </>
    );
}