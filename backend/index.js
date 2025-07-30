require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const artistRoute = require('./routes/artistRoute');
const venueRoute = require('./routes/venueRoute');
const gigRoute = require('./routes/gigRoute');
const couponRoute = require('./routes/couponRoute');
const ticketRoute = require('./routes/ticketRoute');
const userRoute = require('./routes/userRoute');
const mainRoute = require('./routes/mainRoute');
const homeRoute = require('./routes/homeRoute');
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();
const port = 5001;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://off-axis.sirapop.dev", "http://51.21.204.228:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"]
}));


// Static uploads route
app.use('/api/uploads', express.static('uploads'));

// API routes
app.use('/api/artists', artistRoute);
app.use('/api/venue', venueRoute);
app.use('/api/gig', gigRoute);
app.use('/api/coupon', couponRoute);
app.use('/api/ticket', ticketRoute);
app.use('/api/user', userRoute);
app.use('/api/main', mainRoute);
app.use('/api/home', homeRoute);
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);

// Test API endpoint
app.get('/api', (req, res) => {
  res.send('API is running');
});

// Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const line_items = req.body.gigs.map(gig => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: gig.gig_name + " - " + gig.date,
        },
        unit_amount: Math.round(gig.price * 100),
      },
      quantity: gig.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      mode: 'payment',
      line_items,
      allow_promotion_codes: true,
      success_url: `${process.env.CLIENT_URL}/`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
