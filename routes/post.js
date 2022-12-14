const express = require('express');
const postController = require('../controllers/post.controller');
 const router = express.Router();
 const testController = require('../controllers/test.controller')
 const authMiddleware = require('../middleware/check-auth')


//  router.get('/',(req,res)=>{
//     res.json(testController);
//  })

 router.post('/',authMiddleware.checkAuth,postController.save)
 router.get('/',postController.index)

 router.get('/:id',postController.show)
 router.patch('/:id',authMiddleware.checkAuth,postController.update)
 router.delete('/:id',authMiddleware.checkAuth,postController.Delete)

 module.exports = router;