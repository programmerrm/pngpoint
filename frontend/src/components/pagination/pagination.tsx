import { useDispatch, useSelector } from 'react-redux';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import { setPage } from '../../redux/features/getImages/getImageSlice';
import type { RootState } from '../../redux/store';


export default function Pagination({ totalPages }: { totalPages: number }) {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.search.page);

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
    };

    return (
        <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
        />
    );
}
