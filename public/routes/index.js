import { Router } from "express";
import generateFaker from '../../faker.js?';

const router = Router();

router.get("/form", (req, res) => {
    res.render("form");
    });

router.route('/api/productos-test').get(async (req, res) => {
        res.render('test', { items: generateFaker() })
        //res.send('hola')
    })

    router.route('/').get(async (req, res) => {
        if(req.session.user) { 
            res.render('form', { user: req.session.user })
            }
            else{
                res.render('login')
            }
       // res.render('login')
    })

    router.route('/').post(async (req, res ) => {
            
            let  user  = req.body.user
            if(user) req.session.user = user
            res.render('form', { user })
    })

    router.route('/logout').get(async (req, res) => {
        req.session.destroy()
        res.redirect('/')
    })

export default router;