import jwt from 'jsonwebtoken';
import User from "../models/User.js";

// burada we look how tokens-ka nooloo so celiyay intee ku isticmaalaynaa, how they works and how we give verification to the user
// bu middleWare wuxu informationka ka qaadaana user-ka eeku jira headers inta uusan req iyo res u gudbin

export const protect = async(req, res, next)=> {
    // here waxan ku xaqiijinay id-iiga inuu jiro iyo inkale
    const token = req.headers.authorization?.split(' ')[1];

    // here waxan hubinay token majiraa,token haduu jirin message-kan u dir
    if(!token) return res.status(401).json({message: 'No Token Provided'});

    try {
        // decode=sidii hore ku celi, hubi token true or false,kadib hubi token-ka iyo secret-ka ma isleeyihiin
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // id-iiga ku raadi wixi kasoo baxo information-ka user-ka decode.id u dhiib lkn password-ka kareeb
        req.user = await User.findById(decode.id).select('-password');
        next();
        // kan wuxu so celinaya error lkn asaa is xalinaayo marka hadiiba line-kaas laga so gudbo user-ka ayan aqoonsi siinaynaa
    } catch (err) {
        res.status(401).json({message: 'Invalid or Expired Token'})
    }
}