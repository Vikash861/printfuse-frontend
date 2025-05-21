import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

const ProductList = () => {
  const { products, fetchProducts, deleteProduct } = useProduct();

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        await fetchProducts();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">My Products</Typography>
        <Button component={Link} to="/add-product" variant="contained">
          Add Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(products) &&
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/edit-product/${product.id}`}>
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      sx={{ ml: 1, minWidth: 80 }}
                    >
                      {deletingId === product.id ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
