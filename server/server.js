const express = require('express');
const app = express();
const stripe = require('stripe')('pk_test_51K2F87HP0YfNGUskDKvzDm2xfujXBn8aBagLHUoO9FR2kIjymRKxyJKQvqHORq6DfLx28JSeyWFMZeImMLk9ghTO00ZNHB8By5');

app.use(express.json());

app.post('/api/create-product', async (req, res) => {
  try {
    // Récupérer les données du produit depuis la requête
    const { name, description, price } = req.body;

    // Créer le produit avec Stripe
    const product = await stripe.products.create({
      name,
      description,
    });

    // Créer le prix du produit
    const productPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: price,
      currency: 'eur',
    });

    res.status(200).json({
      message: 'Le produit a été créé avec succès',
      product: product.id,
      price: productPrice.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Le serveur a démarré sur le port 3000');
});
