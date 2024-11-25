import halls from "../models/HallsModel.js";

// CREATE HALL
export const createHall = async (req, res) => {
    const newHall = new halls(req.body);
    try {
        const savedHall = await newHall.save();
        res.status(200).json(savedHall);
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        });
    }
};

// GET HALL BY ID
export const getHall = async (req, res) => {
    try {
        const { Hall_ID } = req.params; // Changed to req.params to get ID from URL
        if (!Hall_ID) throw new Error("No Hall Id found");
        
        // Find hall by ID
        const hall = await halls.findById(Hall_ID); // Corrected query to find by ID
        if (!hall) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'Hall not found'
            });
        }
        
        res.status(200).json(hall);
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message || err
        });
    }
};

// GET ALL HALLS
export const getAllHalls = async (req, res) => {
    try {
        // Fetch all halls
        const hallsList = await halls.find();
        res.status(200).json(hallsList);
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message || err
        });
    }
};
