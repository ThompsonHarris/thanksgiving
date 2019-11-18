const router = require("express").Router();
const { Person, Dish } = require("../../db");

// make sure to use router.get, router.post etc..., instead of app.get, app.post, or etc... in this file.
// see https://expressjs.com/en/api.html#routers

router.get("/", (req, res, next) => {
    if(req.query.is_attending==='true'){
        Person.findAll({
            where: {
                isAttending: true,
              }
        })
        .then((data)=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(200).send(console.log(err))
        })
        .catch(next)
    } else if (req.query.is_attending==='false'){
        Person.findAll({
            where: {
                isAttending: false,
              }
        })
        .then((data)=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(200).send(console.log(err))
        })
        .catch(next)
    }
    else {
        Person.findAll({
            include:[{
                model:Dish
            }]
        })
        .then((data)=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(200).send(console.log(err))
        })
        .catch(next)
    }
});

router.post("/", (req, res, next) => {
    if(req.body.name != undefined && req.body.isAttending != undefined){
      Person.create(req.body)
      .then(()=>{
      Person.findAll()
      .then((data)=>{
          res.send(data)
      })
      .catch(err=>{
            res.status(200).send(console.log(err))
      })
      .catch(next)
      })
    } else {
        res.status(400).send(console.log('missing name and/or attending status'))
    }
})

router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    Person.update(
        req.body,
        {where: {id: id}}
      )
    .then((data) => {
        if(data.includes(1)){
            Person.findByPk(id)
            .then((data)=>{
            res.send(data)})
        } else {
            res.status(400).send("instance doesn't exist!")
        }
    })
    .catch(next)
})

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Person.destroy({
      where: { id: id }
    })
    .then((data) => {
        if(data){
            res.status(200).send('success')
        } else {
            res.status(400).send("instance doesn't exist!")
        }
    })
    .catch(next)
  });
    

module.exports = router;
