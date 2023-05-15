import { Router } from 'express';
import * as Posts from './controllers/post_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.route('/posts')
  .post(async (req, res) => {
    const postFields = req.body;
    try {
      const result = await Posts.createPost(postFields);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const result = await Posts.getPosts();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route('/posts/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Posts.getPost(id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const postFields = req.body;
    try {
      const result = await Posts.updatePost(id, postFields);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Posts.deletePost(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
