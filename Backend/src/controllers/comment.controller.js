const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const comment = new Comment({
    userId: req.user.id,
    complaintId: req.params.id,
    content: req.body.content
  });
  await comment.save();
  res.json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ complaintId: req.params.id }).populate("userId","name");
  res.json(comments);
};
