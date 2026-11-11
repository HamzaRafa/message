
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Code secret configuré dans Render
const RESET_CODE = process.env.RESET_CODE;

// État de l'accès unique
let alreadyOpened = false;

app.use(express.json());

// Servir uniquement les fichiers publics
app.use(express.static(path.join(__dirname, "public"), {
    index: false
}));

// Accès à la page privée
app.get("/", (req, res) => {

    if (alreadyOpened) {
        return res.status(403).send(`
            <html lang="fr">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Accès terminé</title>
            <body style="font-family:Arial;text-align:center;padding:70px 20px;background:#fbf5f0;color:#39283b">
                <h1>♡</h1>
                <h2>Cette petite surprise a déjà été découverte.</h2>
                <p>Merci d'être passée. ✨</p>
            </body>
            </html>
        `);
    }

    // Consommer l'accès dès la première ouverture
    alreadyOpened = true;

    res.sendFile(path.join(__dirname, "private", "index.html"));
});

// Page de réinitialisation
app.get("/reset", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "reset.html"));
});

// Réinitialiser avec le code secret
app.post("/api/reset", (req, res) => {

    const { code } = req.body;

    if (!RESET_CODE || code !== RESET_CODE) {
        return res.status(401).json({
            success: false,
            message: "Code incorrect."
        });
    }

    alreadyOpened = false;

    res.json({
        success: true,
        message: "Accès réinitialisé avec succès !"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
