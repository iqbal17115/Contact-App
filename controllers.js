const Contact=require('./Contact');

exports.getAllContacts=(req, res)=>{
    Contact.find()
    .then(contact=>{
        res.render('index',{ contact });
    }).catch(e=>{
        console.log(e)
        res.json({
            message: "Error Occured!!"
        })
    })
}

exports.getSingleContact=(req, res)=>{
    const { id }=req.params
    Contact.findById(id)
    .then(contact=>{
        res.json(contact)
    }).catch(e=>{
        console.log(e)
        res.json({
            message: "Error Occured!!"
        })
    })
}

exports.createContact=(req, res)=>{
    let { name, phone, email, id } = req.body;

   let contact=new Contact({
       name,
       email,
       phone
   })
   
   if(id){
    
    Contact.findOneAndUpdate(
        {
            "_id":id 
        },
        {$set: {
            name,
            email,
            phone
        }},
        { 
            new: true
        }
        )
        .then(
            Contact.find()
            .then(contact=>{
                res.render('index',{ contact });
            }).catch(e=>{
                console.log(e)
                res.json({
                    message: "Error Occured!!"
                })
            })
        ).catch(e=>{
            console.log(e)
            res.json(contact)
        })

   }else{
    contact.save().then(r=>{
       
        Contact.find()
        .then(contact=>{
            res.render('index',{ contact });
        }).catch(e=>{
            console.log(e)
            res.json({
                message: "Error Occured!!"
            })
        })
    
       }).catch(e=>{
           res.json(e)
       });
   }
  
}

exports.updateContact=(req, res)=>{
    
   const { name, email, phone }=req.body
   const { id }=req.params
   Contact.findOneAndUpdate(
       {
           id 
       },
       {$set: {
           name,
           email,
           phone
       }},
       { 
           new: true
       }
       )
       .then(contact=>{
           res.send(contact)
       }).catch(e=>{
           console.log(e)
           res.json(contact)
       })

}

exports.deleteContact=(req, res)=>{
       const {id}=req.params
       console.log(id)
        Contact.findOneAndDelete({ '_id':id })
        .then(
            Contact.find()
            .then(contact=>{
                res.render('index',{ contact });
            }).catch(e=>{
                console.log(e)
                res.json({
                    message: "Error Occured!!"
                })
            })
        ).catch(e=>{
            console.log(e)
            res.json("Error Occured!!")
        })

}