import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import productosIniciales from "../data/products";


// =====================================================
// CONTEXTO DE PRODUCTOS
// =====================================================

const ProductsContext = createContext();


// =====================================================
// PROVIDER
// =====================================================

export function ProductsProvider({ children }) {

  const [products, setProducts] = useState(() => {

    try {

      const productosGuardados =
        localStorage.getItem("productos");

      if (productosGuardados) {
        return JSON.parse(productosGuardados);
      }

    } catch (error) {

      console.error(
        "Error al cargar los productos:",
        error
      );

    }

    return productosIniciales;

  });


  // ===================================================
  // GUARDAR PRODUCTOS
  // ===================================================

  useEffect(() => {

    localStorage.setItem(
      "productos",
      JSON.stringify(products)
    );

  }, [products]);


  // ===================================================
  // AGREGAR PRODUCTO
  // ===================================================

  const addProduct = (producto) => {

    const nuevoProducto = {

      ...producto,

      id: Date.now()

    };

    setProducts((productosActuales) => [

      ...productosActuales,

      nuevoProducto

    ]);

  };


  // ===================================================
  // ACTUALIZAR PRODUCTO
  // ===================================================

  const updateProduct = (id, datosActualizados) => {

    setProducts((productosActuales) =>

      productosActuales.map((producto) =>

        producto.id === id

          ? {
              ...producto,
              ...datosActualizados
            }

          : producto

      )

    );

  };


  // ===================================================
  // ELIMINAR PRODUCTO
  // ===================================================

  const deleteProduct = (id) => {

    setProducts((productosActuales) =>

      productosActuales.filter(
        (producto) => producto.id !== id
      )

    );

  };


  // ===================================================
  // OBTENER PRODUCTO
  // ===================================================

  const getProductById = (id) => {

    return products.find(
      (producto) => producto.id === id
    );

  };


  // ===================================================
  // VALORES DEL CONTEXTO
  // ===================================================

  const value = {

    products,

    // Alias por si alguna parte del proyecto
    // utiliza "productos"
    productos: products,

    addProduct,

    updateProduct,

    deleteProduct,

    getProductById

  };


  return (

    <ProductsContext.Provider value={value}>

      {children}

    </ProductsContext.Provider>

  );

}


// =====================================================
// HOOK
// =====================================================

export function useProducts() {

  const context = useContext(ProductsContext);


  if (!context) {

    throw new Error(
      "useProducts debe utilizarse dentro de ProductsProvider"
    );

  }


  return context;

}


export default ProductsContext;