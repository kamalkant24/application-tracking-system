// import jwt from 'jsonwebtoken'
// import User from '../models/User.js';
// const secret = process.env.JWT_SECRET || "atsjwtkey"

// const authenticate = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization;
        
//         const decoded = jwt.verify(token, secret);
        
//         const user = await User.findById(decoded.userId);
        
//         if (!user) {throw new Error("User not found")}
        
//         req.token = token
//         req.userId = decoded.userId
//         req.user = user;

//         next();
//     } catch (error) {
//         return res.status(401).json({status:401,error});
//     }



// }


// export { authenticate}
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const secret = process.env.JWT_SECRET || "atsjwtkey";  // Ensure this secret is consistent

const authenticate = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.headers.authorization?.split(" ")[1]; // This handles the "Bearer <token>" format
        
        if (!token) {
            return res.status(401).json({ status: 401, error: 'Token not provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, secret);

        // Find the user associated with the token
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ status: 401, error: 'User not found' });
        }

        // Attach user details to the request object for later use in routes
        req.token = token;
        req.userId = decoded.userId;
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle errors such as invalid token or other server issues
        return res.status(401).json({ status: 401, error: error.message || 'Authentication failed' });
    }
};

export { authenticate };
