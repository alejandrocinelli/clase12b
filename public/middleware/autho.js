const authoController = async (req ,res , next ) => { 

    try { 

        const { user } = req.query 

        if(user ) req.session.user = user 

        next() 

    }
    catch (error) { 
        console.log(error) 
    }
  
    res.render('login')
}