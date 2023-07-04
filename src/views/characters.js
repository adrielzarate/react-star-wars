import { useSearchParams } from 'react-router-dom';
import Col from '@nextui-org/react/col';
import { CharactersTable } from '../components/characters-table';

export const Characters = () => {
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    return (
        <Col align="center">
            <CharactersTable currentPage={currentPage} />
        </Col>
    );
};
