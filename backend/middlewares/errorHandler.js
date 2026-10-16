// here every cilad ka dhacda in our app ayuu masuul ka noqonaya not mater what is the error and where it comes.
// markaa wacayno in the index.js waa inaan ka dhignaa the last middleWare cunku (next)malahan qof kale ka dambeeya uu u wacayo majiro. bu err buraya ozel , inta req iyp res loo gudbin ayuu errorska soo qabanaaya

export const errorHandler = (err, req, res, next) => {
    // error-ka jiro wuxu yhy statusCode-ka kaqaado ,hadii la waayo error status waxad dhahdaa 500 oo ah server error 
    const status = err.statusCode || 500;
    // status-ka halkan ayan kadiraynaa
    res.status(status).json({
        success: false,
        // bu message anaga ayan soo qoranay, hadi la waayo something went wrong u dir user-ka
        message: err.message || 'Something Went Wrong',
        status
    })
}
// when you make error in middleware waxad geenee routes-ka kadib in index.js