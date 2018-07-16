const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 8000;
const app = express();

mongoose.connect('mongodb://localhost/restfulTask')

//json file for API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Task = mongoose.model("tasks", TaskSchema);
module.exports = {
    TaskModel: Task
};

//create

app.post("/task", function (req, res) {
    Task.create({
        task: req.body.task,
        description: req.body.description
    }, function (err, task) {
        if (err) {
            console.log("Create error", err);
            res.json({
                message: "Create error",
                error: err
            });
        } else {
            res.json({
                message: "Success",
                data: task
            })
        }

    })
})

// Show One
app.get("/task/:id", function (req, res) {
    Task.find({_id:req.params.id}, function(err, task){
            if (err) {
                console.log("Show One error", err);
                res.json({
                    message: "Show One error",
                    error: err
                });
            } else {
                res.json({
                    message: "Success Show One",
                    data: task
                })
            }
        })
    })


// app.get("/task/".readAll); // Show All
app.get("/task", function (req, res) {
    Task.find({},
        function (err, task) {
            if (err) {
                console.log("Show All error", err);
                res.json({
                    message: "Show All error",
                    error: err
                });
            } else {
                res.json({
                    message: "Success Show All",
                    data: task
                })
            }
        })
    })

// app.put("/task/:id".updateOne); // update
app.put("/task/:id", function (req, res) {
    Task.updateOne({id:req.params.id}, req.body, function(err, task){
            if (err) {
                console.log("Show One error", err);
                res.json({
                    message: "Show One error",
                    error: err
                });
            } else {
                res.json({
                    message: "Success Show One",
                    data: task
                })
            }
        })
    })

// app.delete("/task/:id".delete); // Delete
app.delete("/task/:id", function (req, res) {
    Task.deleteOne({id:req.params.id}, function(err, task){
            if (err) {
                console.log("couldn't delete by id", err);
                res.json({
                    message: "couldn't delete by id",
                    error: err
                });
            } else {
                res.json({
                    message: "delete by id",
                    data: task
                })
            }
        })
    })




app.get("/", function (req, res) {
    res.send("Hello World!");
});















app.listen(PORT, function () {
    console.log(`Port: ${PORT}`);
})
