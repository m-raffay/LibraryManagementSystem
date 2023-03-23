const Admin = require("../models/Admin");

const adminController = {
async getAllAdmins  (req, res) {
    try {
    const admins = await Admin.findAll();
    res.json(admins);
    } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving admins');
    }
},

async getAdminById(req, res) {
    const { id } = req.params;
    try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
        return res.status(404).send('Admin not found');
    }
    res.json(admin);
    } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving admin');
    }
},

async createAdmin(req, res) {
    const { name, email, username, password } = req.body;
    try {
    const newAdmin = await Admin.create({
        name,
        email,
        username,
        password,
    });
    res.json(newAdmin);
    } catch (error) {
    console.log(error);
    res.status(500).send('Error creating admin');
    }
},

async updateAdminById(req, res) {
    const { id } = req.params;
    const { name, email, username, password } = req.body;
    try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
        return res.status(404).send('Admin not found');
    }
    const updatedAdmin = await admin.update({
        name,
        email,
        username,
        password,
    });
    res.json(updatedAdmin);
    } catch (error) {
    console.log(error);
    res.status(500).send('Error updating admin');
    }
},

async deleteAdminById(req, res) {
    const { id } = req.params;
    try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
        return res.status(404).send('Admin not found');
    }
    await admin.destroy();
    res.send('Admin deleted successfully');
    } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting admin');
    }
},
};


module.exports = adminController ;
