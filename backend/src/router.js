const express = require("express");

const multer = require("multer"); // package qui permet d'uploader des fichiers

const fs = require("fs"); // fonction rename

// Ajout de uuid  ---- Permet d'uploader 2 fichiers au même nom
const { v4: uuidv4 } = require("uuid");

// On définit la destination de stockage de nos fichiers
const upload = multer({ dest: "uploads/" });

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// route pour poster pour recevoir un nouvau fichier

router.post("/api/avatar", upload.single("avatar"), (req, res) => {
  const { originalname } = req.file; // on recupère le nom du fichier
  const { filename } = req.file; // on recupère le nom du fichier
  // On utilise la fonction rename de fs pour renommer le fichier
  fs.rename(
    `uploads/${filename}`,
    `uploads/${uuidv4()} -${originalname}`, // nom aléatoire du fichier + nom du fichierr envoyé si doublon
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});

module.exports = router;
