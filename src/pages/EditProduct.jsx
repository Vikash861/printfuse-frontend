import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useProduct } from '../context/ProductContext';

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { getProduct, updateProduct } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await getProduct(id);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setImageUrl(product.imageUrl);
      } catch (err) {
        console.error(err);
      }
    };
    loadProduct();
  }, [id, getProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await updateProduct(id, { name, description, price, imageUrl });
      navigate('/');
    } catch (err) {
      setError('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Product</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <TextField
          label="Image URL"
          fullWidth
          margin="normal"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Box sx={{ position: 'relative', mt: 2 }}>
          <Button type="submit" variant="contained" disabled={loading}>
            Update Product
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </form>
    </Box>
  );
};

export default EditProduct;