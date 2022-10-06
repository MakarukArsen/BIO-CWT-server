const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Model

const QuestionSchema = new mongoose.Schema({
    name: String,
    phone: String,
    question: String,
    date: String,
});

mongoose.model("Question", QuestionSchema);

const Question = mongoose.model("Question");

// Controller

const getAllQuestions = (req, res) => {
    Question.find()
        .exec()
        .then((contacts) => res.json(contacts))
        .catch((err) => res.status(500).json(err));
};

const createQuestion = (req, res) => {
    Question.create(req.body)
        .then((createContacts) => res.json(createContacts))
        .catch((err) => res.status(500).json(err));
};

const updateQuestion = (req, res) => {
    Question.updateOne({ _id: req.params.id }, { $set: req.body })
        .exec()
        .then((contacts) => res.json(contacts))
        .catch((err) => res.status(500).json(err));
};

const removeQuestion = (req, res) => {
    Question.deleteOne({ _id: req.params.id })
        .exec()
        .then(() => res.json({ success: true }))
        .catch((err) => res.status(500).json(err));
};

// Routes

app.get("/questions", getAllQuestions);
app.post("/questions", createQuestion);
app.put("/questions/:id", updateQuestion);
app.delete("/questions/:id", removeQuestion);

mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://admin:774674@petprojects.yqgmfgf.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => app.listen(process.env.PORT || 5000, () => console.log("server started")))
    .catch((err) => console.error("Error connecting to mongo", err));
