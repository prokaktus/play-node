import Post from '../models/post.model';

import getLogger from '../../lib/get_logger';

const logger = getLogger('default', __filename);

export function getPosts(req, res) {
    Post.find().sort('-date').exec((err, posts) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.json({ posts });
    });
}

export function addPost(req, res) {
    logger.info('Post to posts');

    res.json({status: 'ok'});
}