import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDescription() {
  const { id } = useParams(); // 👈 obtiene el ID desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`) // 👈 usa el ID dinámico
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar el producto");
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Cargando producto...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:text-white">
      <img src={product.image} alt={product.title} className="w-40 h-40 object-contain mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
      <p className="text-green-600 font-semibold text-lg">${product.price}</p>
      <p className="text-sm text-gray-500 mt-2">Categoría: {product.category}</p>
    </div>
  );
}

export default ProductDescription;
