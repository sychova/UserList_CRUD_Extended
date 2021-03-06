const express = require('express')
const router = new express.Router()
const {
    getUsers,
    deleteUser,
    editUser,
    updateUser,
    createUser
} = require("../utils/userService")

router.get("/", (req, res) => {
    res.render("index.pug")
})

// Get Users
router.get("/users", async (req, res) => {
    try {
        const data = await getUsers(req.query)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Create a User
router.post("/users", async (req, res) => {
    try {
        await createUser(req.body)
        res.status(201).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// Get a specific User for Editing
router.get("/users/:id", async (req, res) => {
    try {
        const user = await editUser(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Update the User
router.patch("/users/:id", async (req, res) => {
    try {
        await updateUser(req.body)
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// Delete a User
router.delete("/users/:id", async (req, res) => {
    try {
        await deleteUser(req.params.id)
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
