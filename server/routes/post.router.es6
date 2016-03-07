import { Router } from 'express';
import getLogger from '../../lib/get_logger';
import { getPosts, addPost } from '../controllers/post.controller';

let router = Router();
const logger = getLogger('default', __filename);

router.use(function logRequest(req, res, next) {
    logger.debug('Request to posts router');
    next();
});

router.get('/', getPosts);
router.post('/', addPost);


export default router;