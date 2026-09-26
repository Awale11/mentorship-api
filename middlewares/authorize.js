// user-kan meeshan ama shaqadan maloo ogolyhy waye this file

export const authorize = (...roles)=> {
    // roles-ka loo ogolyhy user-ka waa admin iyo user, .includes searches=elements meesha maku jiraan
// ['admin', 'user'].includes('user') | true, false
    return (req, res, next)=> {
        // haddi maya maku jiraan lasoo celiyo oo looma ogolo ladhaho,status 401 json u bdalaynaa,kadib waxan raacinaynaa roles-ka
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                message: `Acccess denied : Requires on of [${roles.join(',')}]`
            })
        }
        // hadii if-ta uukasoo gudbo means walo ogalyhy ee fasax
        next();
    }
}