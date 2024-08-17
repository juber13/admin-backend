import jwt from 'jsonwebtoken'

const authenticateUser = (req, res, next) => {
    const token = req.cookie;
    console.log(token);
    // if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    //     return res.status(400).json({ message: "pls Login first" })
    // }
    // const token = req.headers.authorization.split(" ")[1];
    // const verifyToken = jwt.verify(token, process.env.SECRETKEY);
    // if (!verifyToken) return res.status(403).json({ message: "You are not authenticat user" });

    // const decode = jwt.decode(token);
    // req.user = decode;
    // next();
}

export default authenticateUser;