import React, { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import toast from "react-hot-toast";
import { getAvailableStock } from "../helpers/stockUtils";

const Home = () => {
  const { products, fetchAllProducts, isLoading } = useProductStore();
  const { cart } = useCartStore();

  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        await fetchAllProducts();
      } catch (error) {
        toast.error("Failed to load products");
        console.error(error);
      }
    };
    load();
  }, []);

  const { addToCart } = useCartStore();

  // Filter products by category and price
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      category === "all" || product.category.toLowerCase() === category;
    const matchPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchCategory && matchPrice;
  });

  // pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="flex gap-4 flex-wrap mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All categories</option>
          <option value="clothes">Clothes</option>
          <option value="footwear">Footwear</option>
          <option value="accessories">Accessories</option>
        </select>

        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
        />
        <span>Máx: ${priceRange[1]}</span>
      </div>
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 border rounded shadow cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <h2 className="text-xl font-semibold ">{product.name}</h2>
                <p className="text-gray-700">${product.price}</p>
                In Stock: {getAvailableStock(product.id, product.stock, cart)}
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const resp = await addToCart(product);
                    if (resp) {
                      toast.success(`${product.name} added to cart`);
                    }
                  }}
                  className="mt-2 w-full bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <ProductModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            product={selectedProduct}
            onAddToCart={addToCart}
          />
        </>
      )}
    </div>
  );
};

export default Home;
