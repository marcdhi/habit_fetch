// IMPORTING ALL ES6 MODULES

import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import fetch from 'node-fetch';
import path from 'path';
const __dirname = path.resolve();
import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate'


const app = express()

// ....................................................

app.use(express.static(__dirname + "/public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

// ....................................................
// MAKE A NEW MONGOOSE DATABASE

mongoose.connect("mongodb://localhost:27017/pixelaDB", { useNewUrlParser: true })

// DEFINE A NEW MONGOOSE SCHEMA

const userSchema = new mongoose.Schema({
    username: String,
    token: String,
    graphName: String,
    date: String,
    graphID: String,
    unit: String,
    type: String,
    quantity: String
})


// A NEW MONGOOSE MODEL

const User = new mongoose.model("User", userSchema)

// ROUTE SECTION


app.get("/", function(req, res) {
    res.render("home")
})

app.post("/", function(req, res) {

    const username = req.body.username //dyanamic
    let token = req.body.token //dyanamic
    let graphName = req.body.graphName //dyanamic
    let date = req.body.date //dyanamic
    let graphID = req.body.graphid //dyanamic
    let unit = req.body.unit //dyanamic
    let type = req.body.type //dyanamic
    let quantity = req.body.quantity //dyanamic

    // NEW DB COLLECTION

    const newUser = new User({
        username: req.body.username,
        token: req.body.token,
        graphName: graphName,
        date: date,
        graphID: graphID,
        unit: unit,
        type: type,
        quantity: quantity

    })

    // A METHOD TO SAVE THE Collection

    newUser.save(function(err) {
        if (!err) {
            res.redirect("/dashboard")
        } else {
            console.log(err);
        }
    })


    async function postData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "X-USER-TOKEN": token
            },
            body: JSON.stringify(data),

        })
        return response.json()
    }


    // FIND METHOD

    User.findOne({}, function(err, foundName) {

            let newID = foundName._id
            if (err) {
                console.log(err);
            } else if (!err) {

                for (var i = 0; i <= foundName.length; i++) {
                    if (newID) {

                        res.render("logged", { thierName: foundName.username })



                    } else {

                        postData('https://pixe.la/v1/users', {
                                token: token,
                                username: username,
                                agreeTermsOfService: "yes",
                                notMinor: "yes"
                            })
                            .then((data) => {
                                console.log(data);
                            });

                        res.render("user", { thierName: foundName.username })
                    }


                }
            }



            // if (!foundName.graphID) {

            //     postData("https://pixe.la/v1/users/" + username + "/graphs", {
            //             id: graphID,
            //             name: graphName,
            //             unit: unit,
            //             type: type,
            //             color: "ajisai",
            //         })
            //         .then((data) => {
            //             console.log(data);
            //         });

            //     res.redirect("/")

            // } else if (woievi) {


            //     postData("https://pixe.la/v1/users/" + username + "/graphs/" + graphID, {
            //             date: date, //dynamic
            //             quantity: quantity //dynamic
            //         })
            //         .then((data) => {
            //             console.log(data);
            //         });

            // }






        })
        // .sort({ _id: -1 })






})

app.get('/dashboard', function(req, res) {
    // Item.find({}, function(err, foundItems) {
    //     if (foundItems.length === 0) {
    //         Item.insertMany(defaultItems, function(err) {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log("success");
    //             }
    //             res.redirect("/dashboard")
    //         })
    //     } else {
    User.findOne({ username: req.body.username }, function(err, foundName) {
            res.render("user", { thierName: foundName.username })
        })
        //     }
        // })




})

app.post('/dashboard', function(req, res) {

    // const itemName = req.body.newItem
    // const listName = req.body.list



    const username = req.body.username //dyanamic
    let token = req.body.token

    // const item = new Item({
    //     name: itemName
    // })

    // if (listName === "Today") {
    //     item.save()
    //     res.redirect("/dashboard")
    // } else {
    //     List.findOne({ name: listName }, function(err, foundList) {
    //         foundList.items.push(item)
    //         foundList.save()
    //         res.redirect("/dashboard/" + listName)
    //     })
    // }

    // async function postData(url = "", data = {}) {
    //     const response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "X-USER-TOKEN": token
    //         },
    //         body: JSON.stringify(data),

    //     })
    //     return response.json()
    // }

    // postData("https://pixe.la/v1/users/" + username + "/graphs", {
    //         id: "graph123",
    //         name: "itemName",
    //         unit: "Km",
    //         type: "float",
    //         color: "ajisai",
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     });

    // User.findOne({}, function(err, foundName) {
    //     console.log(foundName.username);
    // }).sort({ _id: -1 })

})


app.listen(3000, function() {
    console.log("Server Started");
})