const { redirect } = require('express/lib/response');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId)
  Product.findById(prodId, (productItem) => {
    console.log(productItem)
    res.render('shop/product-detail', {
      product: productItem,
      path: '/products',
      pageTitle: productItem?.title
    })
  })


}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};
exports.postCart = (req, res, next) => {
  const productId = req.body.productId
  console.log("🚀 ~ file: shop.js:48 ~ req.body:", req.body)
  console.log("🚀 ~ file: shop.js:48 ~ productId:", productId)
  Product.findById(productId, (prod) => {
    console.log("🚀 ~ file: shop.js:51 ~ Product.findById ~ prod.id:", prod.id)
    Cart.addProduct(prod.id, prod.price)
  })
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
