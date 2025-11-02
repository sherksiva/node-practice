\#### A simple CRUD (Create, Read, Update, Delete) operation in Node.js with MongoDB typically involves using the Express framework for routing and Mongoose for interacting with the MongoDB database.

\### 1. Project Setup:

Initialize a new Node.js project.

Code

```

&nbsp; mkdir my-crud-app

&nbsp; cd my-crud-app

&nbsp; npm init -y

```

Install necessary packages.

Code

```

&nbsp; npm install express mongoose dotenv

```

\### 2. Database Connection (server.js or app.js):

Connect to MongoDB using Mongoose. Replace YOUR\_MONGODB\_URI with your actual connection string (e.g., from MongoDB Atlas or a local instance).

JavaScript



```

&nbsp; require('dotenv').config(); // For environment variables

&nbsp; const express = require('express');

&nbsp; const mongoose = require('mongoose');

&nbsp; const app = express();

&nbsp; const PORT = process.env.PORT || 3000;



&nbsp; app.use(express.json()); // Enable JSON body parsing



&nbsp; mongoose.connect(process.env.MONGODB\_URI, {

&nbsp;     useNewUrlParser: true,

&nbsp;     useUnifiedTopology: true,

&nbsp; })

&nbsp; .then(() => console.log('MongoDB connected'))

&nbsp; .catch(err => console.error('MongoDB connection error:', err));



&nbsp; app.listen(PORT, () => {

&nbsp;     console.log(`Server running on port ${PORT}`);

&nbsp; });

```



\### 3. Mongoose Schema and Model (models/Item.js):

Define a Mongoose schema for your data (e.g., an "Item").

JavaScript

```



&nbsp; const mongoose = require('mongoose');



&nbsp; const itemSchema = new mongoose.Schema({

&nbsp;     name: { type: String, required: true },

&nbsp;     description: String,

&nbsp;     quantity: { type: Number, default: 0 },

&nbsp; });



&nbsp; module.exports = mongoose.model('Item', itemSchema);

```



\### 4. Routes and Controllers (routes/items.js \& controllers/itemController.js):





Create routes to handle CRUD operations.



JavaScript

```

&nbsp; // routes/items.js

&nbsp; const express = require('express');

&nbsp; const router = express.Router();

&nbsp; const itemController = require('../controllers/itemController');



&nbsp; router.post('/', itemController.createItem);

&nbsp; router.get('/', itemController.getAllItems);

&nbsp; router.get('/:id', itemController.getItemById);

&nbsp; router.put('/:id', itemController.updateItem);

&nbsp; router.delete('/:id', itemController.deleteItem);



&nbsp; module.exports = router;

Implement the CRUD logic in a controller.

JavaScript



&nbsp; // controllers/itemController.js

&nbsp; const Item = require('../models/Item');



&nbsp; exports.createItem = async (req, res) => {

&nbsp;     try {

&nbsp;         const newItem = new Item(req.body);

&nbsp;         await newItem.save();

&nbsp;         res.status(201).json(newItem);

&nbsp;     } catch (err) {

&nbsp;         res.status(400).json({ message: err.message });

&nbsp;     }

&nbsp; };



&nbsp; exports.getAllItems = async (req, res) => {

&nbsp;     try {

&nbsp;         const items = await Item.find();

&nbsp;         res.json(items);

&nbsp;     } catch (err) {

&nbsp;         res.status(500).json({ message: err.message });

&nbsp;     }

&nbsp; };



&nbsp; exports.getItemById = async (req, res) => {

&nbsp;     try {

&nbsp;         const item = await Item.findById(req.params.id);

&nbsp;         if (!item) return res.status(404).json({ message: 'Item not found' });

&nbsp;         res.json(item);

&nbsp;     } catch (err) {

&nbsp;         res.status(500).json({ message: err.message });

&nbsp;     }

&nbsp; };



&nbsp; exports.updateItem = async (req, res) => {

&nbsp;     try {

&nbsp;         const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

&nbsp;         if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

&nbsp;         res.json(updatedItem);

&nbsp;     } catch (err) {

&nbsp;         res.status(400).json({ message: err.message });

&nbsp;     }

&nbsp; };



&nbsp; exports.deleteItem = async (req, res) => {

&nbsp;     try {

&nbsp;         const deletedItem = await Item.findByIdAndDelete(req.params.id);

&nbsp;         if (!deletedItem) return res.status(404).json({ message: 'Item not found' });

&nbsp;         res.json({ message: 'Item deleted' });

&nbsp;     } catch (err) {

&nbsp;         res.status(500).json({ message: err.message });

&nbsp;     }

&nbsp; };

```



\### 5. Integrate Routes (server.js or app.js):

Use the item routes in your main application file.

JavaScript

```

&nbsp; // ... (previous server.js code) ...

&nbsp; const itemRoutes = require('./routes/items');

&nbsp; app.use('/api/items', itemRoutes); // Mount routes under /api/items

&nbsp; // ... (rest of server.js code) ...

```

This structure provides a clear separation of concerns, making your Node.js application with MongoDB more organized and maintainable.

