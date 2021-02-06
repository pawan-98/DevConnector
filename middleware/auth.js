const jwt = require('jsonwebtoken');
const config = require('config');
const util = require('util')

module.exports= function(req,res,next){

    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'});
    }

    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));

        req.user = decoded.user;

        // util.inspect is a node.js function used for debugging purpose. i was getting [object object] so I used this.
       // console.log(util.inspect(decoded, {showHidden: false, depth: null}))
        next();
    }
    catch(err){
        res.status(401).json({msg:'Token is not valid'});
    }
}