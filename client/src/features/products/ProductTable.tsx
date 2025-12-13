// ProductTable.tsx

import React, { JSX, useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import {
  loadProducts,
  updateProduct,
  removeProducts,
  addProducts,
} from './ProductSlice';
import { Product, ProductFormInput } from './types/Product';
import Button from '@mui/material/Button';
import { Box, TextField, Collapse } from '@mui/material';
import ProductAddForm from './ProudctAddForm';

function ProductTable(): JSX.Element {
  const products = useSelector((store: RootState) => store.products.products);
  const dispatch = useAppDispatch();
  const [editingCell, setEditingCell] = useState<{
    id: number;
    field: keyof Product;
  } | null>(null);
  const [editingValue, setEditingValue] = useState<string | number>('');
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch, products]);

  const handleRemove = (product: Product): void => {
    dispatch(removeProducts(product.id));
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleEditStart = (
    id: number,
    field: keyof Product,
    value: string | number
  ) => {
    setEditingCell({ id, field });
    setEditingValue(value);
  };

  const handleEditChange = (value: string | number): void => {
    setEditingValue(value);
  };

  const handleEditSave = (product: Product): void => {
    if (editingCell) {
      dispatch(
        updateProduct({ ...product, [editingCell.field]: editingValue })
      );
      setEditingCell(null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleAddProduct = (newProduct: ProductFormInput) => {
    dispatch(addProducts(newProduct));
    setShowAddProductForm(false); // Закрываем форму после сабмита
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
        Cell: ({ row }) => (
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
              style={{ borderRadius: '8px' }}
            />
          </Box>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Название товара',
        size: 150,
        Cell: ({ row }) =>
          editingCell?.id === row.original.id &&
          editingCell.field === 'name' ? (
            <TextField
              value={editingValue}
              onChange={(e) => handleEditChange(e.target.value)}
              onBlur={() => handleEditSave(row.original)}
              autoFocus
            />
          ) : (
            <span
              onClick={() =>
                handleEditStart(row.original.id, 'name', row.original.name)
              }
            >
              {row.original.name}
            </span>
          ),
      },
      {
        accessorKey: 'brand',
        header: 'Производитель',
        size: 150,
        Cell: ({ row }) =>
          editingCell?.id === row.original.id &&
          editingCell.field === 'brand' ? (
            <TextField
              value={editingValue}
              onChange={(e) => handleEditChange(e.target.value)}
              onBlur={() => handleEditSave(row.original)}
              autoFocus
            />
          ) : (
            <span
              onClick={() =>
                handleEditStart(row.original.id, 'brand', row.original.brand)
              }
            >
              {row.original.brand}
            </span>
          ),
      },
      {
        accessorKey: 'category',
        header: 'Категория',
        size: 200,
        Cell: ({ row }) =>
          editingCell?.id === row.original.id &&
          editingCell.field === 'category' ? (
            <TextField
              value={editingValue}
              onChange={(e) => handleEditChange(e.target.value)}
              onBlur={() => handleEditSave(row.original)}
              autoFocus
            />
          ) : (
            <span
              onClick={() =>
                handleEditStart(
                  row.original.id,
                  'category',
                  row.original.category
                )
              }
            >
              {row.original.category}
            </span>
          ),
      },
      {
        accessorKey: 'size',
        header: 'Размер',
        size: 100,
        Cell: ({ row }) =>
          editingCell?.id === row.original.id &&
          editingCell.field === 'size' ? (
            <TextField
              value={editingValue}
              onChange={(e) => handleEditChange(e.target.value)}
              onBlur={() => handleEditSave(row.original)}
              autoFocus
            />
          ) : (
            <span
              onClick={() =>
                handleEditStart(row.original.id, 'size', row.original.size)
              }
            >
              {row.original.size}
            </span>
          ),
      },
      {
        accessorKey: 'sex',
        header: 'Пол',
        size: 100,
        Cell: ({ row }) =>
          editingCell?.id === row.original.id && editingCell.field === 'sex' ? (
            <TextField
              value={editingValue}
              onChange={(e) => handleEditChange(e.target.value)}
              onBlur={() => handleEditSave(row.original)}
              autoFocus
            />
          ) : (
            <span
              onClick={() =>
                handleEditStart(row.original.id, 'sex', row.original.sex)
              }
            >
              {row.original.sex}
            </span>
          ),
      },
      {
        accessorKey: 'price',
        header: 'Стоимость',
        size: 150,
        Cell: ({ row }) =>
          editingCell?.id === row.original.id &&
          editingCell.field === 'price' ? (
            <TextField
              value={editingValue}
              onChange={(e) => handleEditChange(Number(e.target.value))}
              onBlur={() => handleEditSave(row.original)}
              autoFocus
            />
          ) : (
            <span
              onClick={() =>
                handleEditStart(row.original.id, 'price', row.original.price)
              }
            >
              {row.original.price}
            </span>
          ),
      },
      // {
      //   accessorKey: 'quantity',
      //   header: 'Количество',
      //   size: 150,
      //   Cell: ({ row }) =>
      //     editingCell?.id === row.original.id &&
      //     editingCell.field === 'quantity' ? (
      //       <TextField
      //         value={editingValue}
      //         onChange={(e) => handleEditChange(Number(e.target.value))}
      //         onBlur={() => handleEditSave(row.original)}
      //         autoFocus
      //       />
      //     ) : (
      //       <span
      //         onClick={() =>
      //           handleEditStart(
      //             row.original.id,
      //             'quantity',
      //             row.original.quantity
      //           )
      //         }
      //       >
      //         {row.original.quantity}
      //       </span>
      //     ),
      // },
      {
        id: 'actions',
        header: 'Действия',
        size: 150,
        Cell: ({ row }) => (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemove(row.original)}
          >
            Удалить
          </Button>
        ),
      },
    ],
    [editingCell, editingValue]
  );

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddProductForm((prev) => !prev)}
      >
        {showAddProductForm ? 'Скрыть форму' : 'Добавить товар'}
      </Button>

      <Collapse in={showAddProductForm} timeout="auto" unmountOnExit>
        <ProductAddForm
          onAddProduct={handleAddProduct}
          onCloseForm={() => setShowAddProductForm(false)}
          initialProduct={{
            name: '',
            img: '',
            brand: '',
            category: '',
            size: '',
            sex: '',
            price: 0,
            quantity: 0,
          }}
        />
      </Collapse>

      <MaterialReactTable columns={columns} data={products} />
    </>
  );
}

export default ProductTable;
