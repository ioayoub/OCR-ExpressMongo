import Thing from "../models/Thing.js";
import fs from "fs";

const readAllThings = (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};

// Version sans multer
// const createThing = (req, res, next) => {
//   delete req.body._id;
//   const thing = new Thing({
//     ...req.body,
//   });
//   thing
//     .save()
//     .then(() =>
//       res.status(201).json({
//         message: "Objet enregistré !",
//       })
//     )
//     .catch((error) =>
//       res.status(400).json({
//         error,
//       })
//     );
// };

const createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  // Permet de vérifier si c'est bien le bon utilisateur qui fait la demande
  delete thingObject._id;
  delete thingObject._userId;

  const thing = new Thing({
    ...thingObject,
    userId: req.body.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

const readThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

// Version sans multer
// const updateThing = (req, res, next) => {
//   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet modifié !" }))
//     .catch((error) => res.status(404).json({ error }));
// };

const updateThing = (req, res, next) => {
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete thingObject._userId;
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Thing.updateOne(
          { _id: req.params.id },
          { ...thingObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Version sans multer
// const deleteThing = (req, res, next) => {
//   Thing.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet supprimé !" }))
//     .catch((error) => res.status(400).json({ error }));
// };

const deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = thing.imageUrl.split("/images/")[1];
        //Supprime le fichier image
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export default {
  readAllThings,
  readThing,
  createThing,
  updateThing,
  deleteThing,
};
