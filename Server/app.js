const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/27017', { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB veri şemaları
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const categorySchema = new mongoose.Schema({
  name: String,
});

// MongoDB modelleri
const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

// Product CRUD işlemleri

// Tüm ürünleri getir
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Belirli bir ürünü getir
app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: 'Ürün bulunamadı' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Yeni bir ürün ekle
app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  const newProduct = new Product({ name, price });
  try {
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Bir ürünü güncelle
app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { name, price } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price }, { new: true });
    if (!updatedProduct) {
      res.status(404).json({ error: 'Ürün bulunamadı' });
    } else {
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Bir ürünü sil
app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await Product.deleteOne({ _id: productId });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Ürün bulunamadı' });
    } else {
      res.json({ message: 'Ürün başarıyla silindi' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});


// Category CRUD işlemleri

// Tüm kategorileri getir
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Belirli bir kategoriyi getir
app.get('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404).json({ error: 'Kategori bulunamadı' });
    } else {
      res.json(category);
    }
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Yeni bir kategori ekle
app.post('/categories', async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name });
  try {
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Bir kategoriyi güncelle
app.put('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
    if (!updatedCategory) {
      res.status(404).json({ error: 'Kategori bulunamadı' });
    } else {
      res.json(updatedCategory);
    }
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Bir kategoriyi sil
app.delete('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const result = await Category.deleteOne({ _id: categoryId });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Kategori bulunamadı' });
    } else {
      res.json({ message: 'Kategori başarıyla silindi' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Server dinlemesi
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
