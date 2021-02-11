from app.models import db, User, Friendship

def seed_friends():
  users = User.query.all()

  demo = Friendship(user_id=users[0].id, friend_id=users[1].id)
  demo1 = Friendship(user_id=users[0].id, friend_id=users[2].id)
  demo2 = Friendship(user_id=users[0].id, friend_id=users[3].id)
  demo3 = Friendship(user_id=users[0].id, friend_id=users[4].id)
  demo4 = Friendship(user_id=users[0].id, friend_id=users[5].id)
  demo5 = Friendship(user_id=users[0].id, friend_id=users[6].id)
  demo6 = Friendship(user_id=users[1].id, friend_id=users[0].id)
  demo7 = Friendship(user_id=users[2].id, friend_id=users[0].id)
  demo8 = Friendship(user_id=users[3].id, friend_id=users[0].id)
  demo9 = Friendship(user_id=users[4].id, friend_id=users[0].id)
  demo10 = Friendship(user_id=users[5].id, friend_id=users[0].id)
  demo11 = Friendship(user_id=users[6].id, friend_id=users[0].id)

  db.session.add(demo)
  db.session.add(demo1)
  db.session.add(demo2)
  db.session.add(demo3)
  db.session.add(demo4)
  db.session.add(demo5)
  db.session.add(demo6)
  db.session.add(demo7)
  db.session.add(demo8)
  db.session.add(demo9)
  db.session.add(demo10)
  db.session.add(demo11)

  db.session.commit()


def undo_friends():
  db.session.execute('TRUNCATE friendships CASCADE;')
  db.session.commit()