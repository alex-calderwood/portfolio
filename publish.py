import os
from main import db
from models import Post


def publish(dir, category):
    for file in os.listdir(dir):

        post = Post(os.path.join(dir, file), category=category)

        if db.session.query(Post.id).filter(Post.name == post.name).count() > 0:
            print('Post skipped, a post with this name already exists', post)
        else:
            print('created', post)
            db.session.add(post)

    db.session.commit()
    print("Created and published all posts in " + dir)


if __name__ == '__main__':
    db.create_all()
    publish('./posts', 'blog')
    publish('./poetry', 'poetry')
