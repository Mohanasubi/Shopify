const Product = {
  id: "", 
  title: "", 
  image: "", 
  category: "", 
  price: 0, 
  popularity: 0, 
  stock: 0, 
};

const ProductInCart = {
  ...Product, // spreading the properties of Product
  quantity: 0, // number
  size: "", // string
  color: "", // string
};


const User = {
  id: "", // string
  name: "", // string
  lastname: "", // string
  email: "", // string
  role: "", // string
  password: "", // string
};


const Order = {
  id: 0, // number
  orderStatus: "", // string
  orderDate: "", // string
  data: {
    email: "", // string
  },
  products: [], // Array of ProductInCart
  subtotal: 0, // number
  user: {
    email: "", // string
    id: 0, // number
  },
};
