import { Router } from "express";
import generateFaker from '../../faker.js?';

const router = Router();

router.get("/", (req, res) => {
    res.render("form");
    });

router.route('/api/productos-test').get(async (req, res) => {
        res.render('test', { items: generateFaker() })
        //res.send('hola')
    })

export default router;