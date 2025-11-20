import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { username, password} = req.body;

    const hashed = await bcrypt.hash(password, 15);

    const user = await prisma.user.create({
        data: {username, password: hashed},
    });
    
    res.json({message: "User Registered", userId: user.id});
};

export const login = async (req, res) => {
        const { username, password} = req.body;

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) return res.status(400).json({error: "Invalid credentials"});

        const match = await bcrypt.compare(password, user.password);
        
        if (!match) return res.status(400).json({error: "Invalid credentials"});

        const token = jwt.sign(
            { userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN}
        );

        res.json({token});
};