const User = require('../models/User');

// Get All (Chỉ lấy user chưa xóa)
exports.getAllUsers = async (req, res) => {
    const users = await User.find({ isDeleted: false }).populate('role');
    res.json(users);
};

// Get By ID
exports.getUserById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id, isDeleted: false }).populate('role');
    user ? res.json(user) : res.status(404).json("User không tồn tại");
};

// Soft Delete (Xóa mềm)
exports.softDelete = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json("Đã xóa mềm thành công");
};

// Chuyển status về TRUE
exports.enableUser = async (req, res) => {
    const { email, username } = req.body;
    const user = await User.findOneAndUpdate(
        { email, username, isDeleted: false },
        { status: true },
        { new: true }
    );
    user ? res.json(user) : res.status(400).json("Thông tin không khớp");
};

// Chuyển status về FALSE
exports.disableUser = async (req, res) => {
    const { email, username } = req.body;
    const user = await User.findOneAndUpdate(
        { email, username, isDeleted: false },
        { status: false },
        { new: true }
    );
    user ? res.json(user) : res.status(400).json("Thông tin không khớp");
};