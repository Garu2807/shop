// ProductAddForm.tsx

import React, { useState } from 'react';
import { ProductFormInput } from './types/Product';
import { TextField, Button, Box, Typography } from '@mui/material';

type ProductAddFormProps = {
  onAddProduct: (product: ProductFormInput) => void;
  onCloseForm: () => void;
  initialProduct: ProductFormInput;
};

const ProductAddForm: React.FC<ProductAddFormProps> = ({
  onAddProduct,
  onCloseForm,
  initialProduct,
}) => {
  const [newProduct, setNewProduct] =
    useState<ProductFormInput>(initialProduct);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(newProduct);
    onCloseForm();
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 2,
        p: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Добавить новый товар
      </Typography>
      <TextField
        label="Название товара"
        name="name"
        value={newProduct.name}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Производитель"
        name="brand"
        value={newProduct.brand}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Категория"
        name="category"
        value={newProduct.category}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Размер"
        name="size"
        value={newProduct.size}
        onChange={handleInputChange}
      />
      <TextField
        label="Стоимость"
        name="price"
        type="number"
        value={newProduct.price}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Пол"
        name="sex"
        value={newProduct.sex}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="URL изображения"
        name="img"
        value={newProduct.img}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Количество"
        name="quantity"
        type="number"
        value={newProduct.quantity}
        onChange={handleInputChange}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Сохранить
      </Button>
      <Button variant="outlined" onClick={onCloseForm}>
        Отмена
      </Button>
    </Box>
  );
};

export default ProductAddForm;
