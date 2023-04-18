const Admin = require("./admin");
const Customer=require("./customers");
const User=require("../models/user");
const { Op } = require("sequelize");

// Pagination and filtering example for getting all users
const getAllUsers = async (req, res) => {
  try {
    const { page, size, search } = req.query;
    const offset = page ? (page - 1) * size : 0;
    const limit = size ? parseInt(size) : 10;

    // Query options for filtering by name
    const nameFilter = search ? { name: { [Op.like]: `%${search}%` } } : {};

    const users = await User.findAndCountAll({
      where: nameFilter,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      totalItems: users.count,
      users: users.rows,
      currentPage: page ? parseInt(page) : 1,
      totalPages: Math.ceil(users.count / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CREATE - create a new user
const createUser = async (req, res) => {
  try {
    const o=req.body;
    const user = await User.create(o);
    // if(user.role=='admin')
    // {
    //     const ad=await Admin.createAdmin(o);
    //     console.log(ad);
    // }
    // else
    // {
    //     const c=await Customer.createCustomer(o);
    //     console.log(c);
    // }
    return res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while creating the user',
    });
  }
};



// READ - get a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    return res.status(200).json({
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while fetching user',
    });
  }
};

// UPDATE - update a user by ID
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      return res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    }
    throw new Error('User not found');
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while updating user',
    });
  }
};

// DELETE - delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).json({
        message: 'User deleted successfully',
      });
    }
    throw new Error('User not found');
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while deleting user',
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
