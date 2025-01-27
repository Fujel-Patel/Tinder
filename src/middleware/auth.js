const adminAuth = (req, res, next) => {
    console.log("admin auth is checked !!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(400).send("Unauthorized Request")
    }else{
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("admin auth is checked !!");
    const token = "xyz";
    const isUSerAuthorized = token === "xyz";
    if(!isUSerAuthorized){
        res.status(400).send("Unauthorized Request")
    }else{
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth
}