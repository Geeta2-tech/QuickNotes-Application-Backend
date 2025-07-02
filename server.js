const dotenv = require('dotenv');
const app = require('./src/app');

// Load environment variables from .env file
dotenv.config()

// port configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});