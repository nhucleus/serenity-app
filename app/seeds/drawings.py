from app.models import db, User, Drawing
import datetime

def seed_drawings():
  users = User.query.all()

  demo = Drawing(user=users[0],
                title='Sunshine',
                image='https://3dprint.com/wp-content/uploads/2016/10/paint.png',
                created_at='2020-02-01 11:30:02')
  
  demo1 = Drawing(user=users[0],
                title='My favorite birthday!',
                image='https://i.imgur.com/HcvgflY.jpg',
                created_at='2020-02-02 10:43:03')
  
  demo2 = Drawing(user=users[0],
                title='Went to the zoo',
                image='https://i.pinimg.com/originals/23/47/f7/2347f7923af89235dbdee664aec84041.png',
                created_at='2020-02-03 12:52:05')

  demo3 = Drawing(user=users[0],
                title='Flowers at the market',
                image='https://static.boredpanda.com/blog/wp-content/uploads/2018/03/grandmother-microsoft-paint-art-concha-garcia-zaera-spain-11.jpg',
                created_at='2020-02-04 13:40:04')

  demo4 = Drawing(user=users[0],
                title='Wonderful family',
                image='https://i.pinimg.com/originals/90/02/25/90022597bc0ffb8f41e895f3c22b26eb.jpg',
                created_at='2020-02-05 15:40:48')

  db.session.add(demo)
  db.session.add(demo1)
  db.session.add(demo2)
  db.session.add(demo3)
  db.session.add(demo4)

  db.session.commit()


def undo_drawings():
  db.session.execute('TRUNCATE drawings CASCADE;')
  db.session.commit()
