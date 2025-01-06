import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';
import Labs from '../models/labsModel.js';
import User from '../models/userModel.js';


export const AdminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        if (!email || !password) {
            return res.json({ message: 'Email and password are required', success: false });
        }

        
        const admin = await Admin.findOne({ email });

        
        if (!admin) {
            return res.json({ message: 'Admin not found', success: false });
        }

      

        
        if (admin.password !== password) {
            return res.json({ message: 'Invalid password', success: false });
        }

        
        const token = jwt.sign(
            { email: admin.email, id: admin._id, role: 'admin' },
            process.env.JWT_SECRET || 'default_secret_key',
            { expiresIn: '1d' }
        );

        
        return res.status(200).json({
            message: 'Admin Login Successful',
            token,
            role: 'admin',
            success: true
        });
    } catch (error) {
        console.error('AdminLogin Error:', error);
        return res.json({ message: 'Something went wrong', success: false });
    }
};


export const AddUser = async (req , res)=>{
    try{
        const {email , password , name , phone} = req.body;

        if(!email || !password || !name){
            return res.json({message : 'Email , Password and Name are required' , success : false});
        }

        const user = new User({
            email,
            phone,
            password,
            name,
            labs : []
        });

        await user.save();

        return res.json({message : 'User added successfully' , success : true});
    }
    catch(error){
        console.error('AddUser Error:', error);
        return res.json({ message: 'Something went wrong', success: false });
    }
}

export const AddLab = async (req, res) => {
    try {
        const { title, description, duration, instructor, userEmails } = req.body;
        
       
        if (!title || !description || !duration || !instructor || !userEmails) {
            return res.json({ message: 'All fields are required', success: false });
        }

        const emailArray = Array.isArray(userEmails) ? userEmails : [userEmails];
        
      
        const userIds = await Promise.all(emailArray.map(async (email) => {
           
            const userLabs = await User.findOne({ email });
            if (!userLabs) {
                throw new Error(`User with email ${email} not found.`);
            }
            return userLabs._id;
        }));

        const lab = new Labs({
            title,
            description,
            duration,
            instructor,
            User: userIds
        });

        await lab.save();
        return res.json({ message: 'Lab added successfully', success: true });
    }
    catch (error) {
        console.error('AddLab Error:', error);
        return res.json({ message: error.message || 'Something went wrong', success: false });
    }
}

export const GetLabs = async (req, res)=>{ 
    try{
        const labs = await Labs.find().populate('User');
        return res.status(200).json(labs);
    }
    catch(error){
        console.error('GetLabs Error:', error);
        return res.json({ message: 'Something went wrong', success: false });
    }
}

export const GetUsers = async (req, res)=>{ 
    try{
        const users = await User.find({});

        return res.json({users , success : true});
    }
    catch(error){
        console.error('GetUsers Error:', error);
        return res.json({ message: 'Something went wrong', success: false });
    }
}