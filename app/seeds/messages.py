from app.models import db, User, Message

def seed_messages():
  users = User.query.all()

  demo = Message(user_id=users[1],
                subject="You're the best!",
                body="You make a bigger impact than  you realize.",
                friend_id=users[0])

  demo = Message(user_id=users[2],
                subject="I love you <3",
                body="You make me float up like I'm on millions of bubbles.",
                friend_id=users[0])

  demo = Message(user_id=users[3],
                subject="Hello, Beautiful!",
                body="I know that you will always have my back, because that is the kind of person you are.",
                friend_id=users[0])

  demo = Message(user_id=users[4],
                subject="You're the best!",
                body="You have the best smile.",
                friend_id=users[0])


def undo_messages():
  db.session.execute('TRUNCATE messages CASCADE;')
  db.session.commit()