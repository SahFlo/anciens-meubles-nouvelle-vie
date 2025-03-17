var express = require("express");
var router = express.Router(); //router : Crée un routeur Express pour définir les routes.
const { Furniture } = require("../models"); // Importe le modèle Furniture

// GET /users - Récupère la liste des meubles
router.get("/", async (req, res) => {
  try {
    const furnitures = await Furniture.findAll(); //récupère tous les enregistrements de la table Furniture.
    res.json(furnitures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /users/:id - Récupère un meuble spécifique
router.get("/:id", async (req, res) => {
  //Définit une route GET pour récupérer un meuble spécifique par son ID.
  try {
    const furniture = await Furniture.findByPk(req.params.id);
    if (furniture) {
      res.json(furniture);
    } else {
      res.status(404).json({ error: "Furniture not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /users - Crée un nouvel utilisateur
router.post("/", async (req, res) => {
  try {
    const newFurniture = await Furniture.create(req.body); //Crée un nouveau meuble avec les données fournies dans le corps de la requête.
    res.status(201).json(newFurniture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /users/:id - Met à jour un utilisateur existant
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Furniture.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedFurniture = await Furniture.findByPk(req.params.id);
      res.status(200).json(updatedFurniture);
    } else {
      res.status(404).json({ error: "Furniture not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /users/:id - Supprime un utilisateur
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Furniture.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Furniture deleted");
    } else {
      res.status(404).json({ error: "Furniture not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
