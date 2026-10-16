import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100, // max 100 requests per IP per 15 mins
    message: 'Too many requests. Please try again later.'
})
// waxan u ogalanhay user-ka requests-ka so dalbanaayo 15-tii daqiiqaba 100 jeer inuu so dalban karo wixi kabadan maya 
// waa in la xadidaa user-ka so dalbanaya request-ga oo rabo inuu page-keena soo booqdo, tusaale ahaan 10 kii daqiiqaba 50 wax ka bdan oo codsi masoo dalban karo