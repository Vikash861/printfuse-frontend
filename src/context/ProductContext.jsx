import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.data.products);
    } catch (error) {
      throw error;
    }
  };

  const addProduct = async (productData) => {
    try {
      const response = await api.post('/products', productData);
      setProducts([...products, response.data.product]);
    } catch (error) {
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      setProducts(products.map(p => p.id === id ? response.data.product : p));
    } catch (error) {
      throw error;
    }
  };

  const getProduct = async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data.product;
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts, addProduct, updateProduct, getProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);