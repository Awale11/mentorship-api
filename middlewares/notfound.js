// here we make 404 middleWare ,user-ka ayan u sheegayna qaladka wuxu yhy

export const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    // route-ka ad raadinoosid is not found
    error.statusCode = 404
    next(error);
}

// after this ku laabo index.js si aan u isticmaalno