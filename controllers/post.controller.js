const params = require("../app");
const model = require("../models");
const validator = require("fastest-validator");
const dotenv = require("dotenv");

dotenv.config();

//to create a new post.
const save = (req, res) => {
  // console.log("====================");
  console.log(req.body);
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
    userId: req.userData.userId,
  };
  console.log(req.userData);

  //to validate data
  const schema = {
    title: { type: "string", optional: "false", max: 100 },
    content: { type: "string", optional: "false", max: 100 },
    categoryId: { type: "number", optional: "false" },
  };
  const validate = new validator();
  const validationResponse = validate.validate(post, schema);
  if (validationResponse !== true) {
    return res.status(400).json({
      messege: "Validation failed",
      error: validationResponse,
    });
  }

  model.category
    .findByPk(req.body.categoryId)
    .then((result) => {
      if (result !== null) {
        model.Post.create(post)
          .then((result) => {
            res.status(201).json({
              messege: "Post create successfully",
              post: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              messege: "Something went wrong",
              error: error,
            });
          });
      }
    })
    .catch((error) => {
      res.status(400).json({
        messege: "Invalid category ID",
      });
    });
};

// To get a specified post.
const show = (req, res) => {
  const id = req.params.id;

  model.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          messege: "Id not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
      });
    });
};

//To get all post
const index = (req, res) => {
  model.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
      });
    });
};

//To update post
const update = (req, res) => {
  const id = req.params.id;

  const updateData = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
  };
  const userId = req.userData.userId;

  const schema = {
    title: { type: "string", optional: "false", max: 100 },
    content: { type: "string", optional: "false", max: 100 },
    categoryId: { type: "number", optional: "false" },
  };
  const validate = new validator();
  const validationResponse = validate.validate(updateData, schema);
  if (validationResponse !== true) {
    return res.status(400).json({
      messege: "Validation failed",
      error: validationResponse,
    });
  }
  // const userId = 1;
  model.Post.findByPk(id)
    .then((result) => {
      if (result) {
        model.Post.update(updateData, { where: { id: id } }).then((result) => {
          res.status(200).json(updateData);
        });
      } else {
        res.status(404).json({
          messege: "Id not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
      });
    });
};

//To delete a post
const Delete = (req, res) => {
  const id = req.params.id;
  const userId = req.userData.userId;

  model.Post.destroy({ where: { id: id } })
    .then((result) => {
      if (result) {
        res.status(200).json({ messege: "Successfully delete" });
      } else {
        res.status(404).json({
          messege: "Id not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong!!",
      });
    });
};

module.exports = {
  save: save,
  show: show,
  index: index,
  update: update,
  Delete: Delete,
};
