import Post from '../models/post_model';

export async function createPost(postFields) {
  const post = new Post();

  post.title = postFields.title;
  post.tags = postFields.tags;
  post.content = postFields.content;
  post.coverUrl = postFields.coverUrl;

  try {
    const savedPost = await post.save();
    return savedPost;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
}

export async function getPosts() {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts.map((el) => {
      return {
        id: el.id,
        title: el.title,
        tags: el.tags,
        coverUrl: el.coverUrl,
      };
    });
  } catch (error) {
    throw new Error(`get posts error: ${error}`);
  }
}

export async function getPost(id) {
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error('no post found');
    }
    return post;
  } catch (error) {
    throw new Error(`get post by id error: ${error}`);
  }
}

export async function deletePost(id) {
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      throw new Error('no post found');
    }
    return post;
  } catch (error) {
    throw new Error(`delete post by id error: ${error}`);
  }
}

export async function updatePost(id, postFields) {
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error('no post found');
    }
    if (postFields.title) {
      post.title = postFields.title;
    }
    if (postFields.tags) {
      post.tags = postFields.tags;
    }
    if (postFields.content) {
      post.content = postFields.content;
    }
    if (postFields.coverUrl) {
      post.coverUrl = postFields.coverUrl;
    }
    return post.save();
  } catch (error) {
    throw new Error(`update post by id error: ${error}`);
  }
}
