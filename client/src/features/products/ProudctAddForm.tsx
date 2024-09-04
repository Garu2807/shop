import React, { useState } from 'react';
import { ProductFormInput } from './types/Product'; // Используем ProductFormInput
import { useAppDispatch } from '../../store';
import { addProducts } from './ProductSlice';

type ProductPropsType = {
  product: ProductFormInput; // Используем ProductFormInput как тип для пропса
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProudctAddForm({
  product,
  setShowForm,
}: ProductPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(product.name);
  const [img, setImg] = useState(product.img);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [size, setSize] = useState(product.size);
  const [sex, setSex] = useState(product.sex);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity); // Добавляем поле quantity

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      name.trim() ||
      img.trim() ||
      brand.trim() ||
      category.trim() ||
      sex.trim() ||
      size.trim() === ''
    )
      return;
    const newProduct: ProductFormInput = {
      name,
      img,
      brand,
      category,
      sex,
      size,
      price,
      quantity, // Указываем количество
    };
    dispatch(addProducts(newProduct));
    setShowForm(false); // Закрываем форму после сабмита
  };

  return (
    <div>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Size"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
        />
        <input
          type="text"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          placeholder="Sex"
        />
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Image URL"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
        />
        <button type="submit">Добавить товар</button>
      </form>
    </div>
  );
}

export default ProudctAddForm;
