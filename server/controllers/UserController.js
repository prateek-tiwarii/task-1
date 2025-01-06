import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Labs from '../models/labsModel.js';

export const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "user not found.",
            });
        }

        if (password !== user.password) {
            return res.status(401).json({
                success: false,
                msg: "Incorrect password.",
            });
        }

        const token = jwt.sign({ email: user.email, id: user._id, role: 'user'  },'default_secret_key' , {
            expiresIn: '1d',
        });

        console.log(token)

        return res.json({
            success: true,
            token,
            role: 'user',
        });
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({
            success: false,
            msg: "Failed to log in user.",
        });
    }
};


export const UpdateUserPassword = async (req, res) => {
    try {
        const { id, currentPassword, newPassword } = req.body;

        if (!id || !currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required.",
            });
        }

      
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found.",
            });
        }

        if (user.password !== currentPassword) {
            return res.status(401).json({
                success: false,
                msg: "Incorrect current password.",
            });
        }

   
        user.password = newPassword;
        await user.save();

        return res.json({
            success: true,
            msg: "Password updated successfully.",
        });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({
            success: false,
            msg: "Failed to update password.",
        });
    }
};


export const getUserLab = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found.",
            });
        }

        const labs = await Labs.find({ User: { $in: [id] } }); 

        return res.status(200).json({
            success: true,
            labs,
        });
    } catch (error) {
        console.error('Error fetching interviewer interviews:', error);
        return res.status(500).json({
            msg: "Failed to fetch interviewer interviews.",
            error: error.message,
        });
    }
}


