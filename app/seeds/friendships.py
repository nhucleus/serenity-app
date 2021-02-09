from app.models import db, User

def seed_friends():
  users = User.query.all()

  demo = friends(user_id=users[0], friend_id=users[1])
  demo1 = friends(user_id=users[0], friend_id=users[2])
  demo2 = friends(user_id=users[0], friend_id=users[3])
  demo3 = friends(user_id=users[0], friend_id=users[4])
  demo4 = friends(user_id=users[0], friend_id=users[5])
  demo5 = friends(user_id=users[0], friend_id=users[6])
  demo6 = friends(user_id=users[1], friend_id=users[0])
  demo7 = friends(user_id=users[2], friend_id=users[0])
  demo8 = friends(user_id=users[3], friend_id=users[0])
  demo9 = friends(user_id=users[4], friend_id=users[0])
  demo10 = friends(user_id=users[5], friend_id=users[0])
  demo11 = friends(user_id=users[6], friend_id=users[0])

  db.session.add(demo)
  db.session.add(demo1)
  db.session.add(demo2)
  db.session.add(demo3)
  db.session.add(demo4)
  db.session.add(demo5)

  db.session.commit()


def undo_friends():
  db.session.execute('TRUNCATE friends CASCADE;')
  db.session.commit()