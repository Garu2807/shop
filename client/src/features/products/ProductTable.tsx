import React, { useEffect, useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { loadProducts, removeProducts } from './ProductSlice';
import { Product } from './types/Product';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

function ProductTable(): JSX.Element {
  const products = useSelector((store: RootState) => store.products.products);
  const dispatch = useAppDispatch();

  // Загружаем продукты при монтировании компонента
  useEffect(() => {
    if (products) {
      dispatch(loadProducts());
    }
  }, [dispatch, products]);

  // Функция для удаления продукта
  const handleRemove = (product: Product): void => {
    dispatch(removeProducts(product.id));
  };

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 150,
      },
      {
        header: 'Фото',
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt="avatar"
              height={50}
              src={row.original.img}
              loading="lazy"
            />
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },

      {
        accessorKey: 'name',
        header: 'Название товара',
        size: 150,
      },
      {
        accessorKey: 'brand',
        header: 'Производитель',
        size: 150,
      },
      {
        accessorKey: 'category',
        header: 'Категория',
        size: 200,
      },
      {
        accessorKey: 'sex',
        header: 'Пол',
        size: 150,
      },
      {
        accessorKey: 'price',
        header: 'Стоимость',
        size: 150,
      },
      {
        id: 'actions',
        header: 'Действия',
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemove(row.original)} // Удаляем продукт
            >
              Удалить
            </Button>
            {/* <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemove(row.original)} // Удаляем продукт
            >
              Удалить
            </Button> */}
          </>
        ),
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={products} />;
}

export default ProductTable;
