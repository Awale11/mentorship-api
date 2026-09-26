// bu loger waa every incoming request
export const logger = (req, res, next) => {
    console.log(`[ ${new Date().toDateString()}] ${req.method} ${req.originalUrl}`);
    next();
}

// bu islemeden sonra index.js gideriz halkaas ayan ka wacaynaa
// burada yaptgimiz kod, terminalde requestin ne zaman gonderildigini bize soyluyor.
