const router = require("express").Router();
const { Dish, Person } = require("../../db");

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#router

router.get("/", (req, res, next) => {
    Dish.findAll()
    .then((data)=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(200).send(console.log(err))
    })
    .catch(next)
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    Dish.findByPk(id)
    .then((data)=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(200).send(console.log(err))
    })
    .catch(next)
});

router.post("/", (req, res, next) => {
    if(req.body.name != undefined && req.body.description != undefined){
        Dish.create(req.body)
        .then(()=>{
        Dish.findAll()
        .then((data)=>{
            res.send(data)
        })
        .catch(err=>{
              res.status(200).send(console.log(err))
        })
        .catch(next)
        })
      } else {
          res.status(400).send(console.log('missing name and/or description'))
      }
});

router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    Dish.update(
        req.body,
        {where: {id: id}}
    )
    .then((data) => {
        if(data.includes(1)){
            Dish.findByPk(id)
            .then((data)=>{
            res.send(data)
    })
        } else {
            res.status(400).send("instance doesn't exist!")
        }
    })
    .catch(next)
});

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Dish.destroy({
      where: { id: id }
    })
    .then((data) => {
        if(data){
            Dish.findAll()
            .then((data)=>{
                res.send(data)  
            })
        } else {
            res.status(400).send("instance doesn't exist!")
        }
    })
    .catch(next)
});

module.exports = router;
