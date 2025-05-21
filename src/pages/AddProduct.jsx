import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useProduct } from '../context/ProductContext';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addProduct } = useProduct();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {  
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await addProduct({ name, description, price, imageUrl });
      navigate('/');
    } catch (err) {
      console.log(err);
      setError('Invalid Image Uri - WooCommerce');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Add Product</Typography>
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
          onChange={(e) => setPrice(parseFloat(e.target.value))}
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
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
          >
            Add Product
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'primary.main',
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

export default AddProduct;