const router = require("express").Router();


router.get('/',(req,res)=>{
    res.status(200).send("auth router")
})

module.exports = router;