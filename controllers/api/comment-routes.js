const router = require("express").Router();
const { Comments } = require("../../models/");
const withAuth = require("../../utils/auth");

//Creating a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*//Updating comments
router.put("edit/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData[0]) {
      res.status(404).json({ message: `No comment found with that id` });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Deleting comments
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const checklistData = await Checklist.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!checklistData) {
      res.status(404).json({ message: "No checklist found with this id!" });
      return;
    }
    res.status(200).json(checklistData);
  } catch (err) {
    res.status(500).json(err);
  }
});*/

module.exports = router;
