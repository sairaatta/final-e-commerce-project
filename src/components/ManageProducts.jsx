import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../redux/productSlice';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  image: Yup.string().url().required('Required')
});

const ManageProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Manage Products</h1>
      <Formik
        initialValues={{ name: '', price: '', image: '' }}
        validationSchema={ProductSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addProduct(values));
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" placeholder="Product Name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <Field name="price" placeholder="Product Price" />
            {errors.price && touched.price ? <div>{errors.price}</div> : null}
            <Field name="image" placeholder="Product Image URL" />
            {errors.image && touched.image ? <div>{errors.image}</div> : null}
            <button type="submit">Add Product</button>
          </Form>
        )}
      </Formik>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} width="50" />
            {product.name} - ${product.price}
            <button onClick={() => dispatch(editProduct({ ...product, name: 'New Name' }))}>Edit</button>
            <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
