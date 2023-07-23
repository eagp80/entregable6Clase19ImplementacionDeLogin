import {Router} from "express";
import ProductManager from '../dao/managers/productManager.js';
import authMdw from "../middleware/auth.middleware.js";


const productManager = new ProductManager("./products.json");
const products =productManager.getProducts();
productManager.products=products;


const router= Router();

router.get('/',(req,res)=>{
    res.render('home', {products})
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {products})
})

// ****** ruta directa
router.get("/login", async (req, res) => {
    res.render("login");
  });
  
  router.get("/register", async (req, res) => {
    res.render("register");
  });
  
  // TODO: Agregar middleware AUTH
  router.get("/profile", authMdw, async (req, res) => {
    const user = req.session.user._doc;
    console.log("🚀 ~ file: views.routes.js:16 ~ router.get ~ user***:",  user);
    res.render("profile", {
     email:  user.email,
     age: user.age,
     last_name: user.last_name,
      carrito: {
        carritoId: "carrito-1",
        productos: [{ productoId: "1", nombre: "camisa" }],
      },
    });
  });

export default router;

