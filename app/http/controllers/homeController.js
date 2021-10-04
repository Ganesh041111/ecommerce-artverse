const Item = require('../../models/item')

function homeController() {
     return {

        async index(req, res) {
            const arts= await Item.find()
            //console.log(arts)
            return res.render('home',{arts:arts})
        //}
        //  index (req, res){
        //     Item.find().then(function(arts){
        //         console.log(arts)
        //         return res.render('home', {arts:arts})
        //     })
            

         }
     }
}

module.exports = homeController