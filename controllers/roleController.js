const Role = require('../models/Role');

exports.createRole = async (req, res) => {
    try {
        const role = await new Role(req.body).save();
        res.status(201).json(role);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getRoles = async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
};