const express = require("express");
const path = require("path");

const app = express();

// Render provides its own port
const PORT = process.env.PORT || 3000;

// Serve HTML, CSS, images and JavaScript
app.use(express.static(path.join(__dirname, "public")));

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Website running on port ${PORT}`);
});
