from app.models import db, User, Drawing
import datetime

def seed_drawings():
  users = User.query.all()

  demo = Drawing(user=users[0],
                title='Sunshine',
                image='morning reminder to upload photos into seed file',
                created_at='2020-02-01 11:30:02')
  
  demo1 = Drawing(user=users[0],
                title='My favorite birthday!',
                image='',
                created_at='2020-02-02 10:43:03')
  
  demo2 = Drawing(user=users[0],
                title='Code code code',
                image='',
                created_at='2020-02-03 12:52:05')

  demo3 = Drawing(user=users[0],
                title='Sunflowers',
                image='',
                created_at='2020-02-04 13:40:04')

  demo4 = Drawing(user=users[0],
                title='Wonderful family',
                image='',
                created_at='2020-02-05 15:40:48')

  db.session.add(demo)
  db.session.add(demo1)
  db.session.add(demo2)
  db.session.add(demo3)
  db.session.add(demo4)

  db.session.commit()


def undo_users():
  db.session.execute('TRUNCATE drawings CASCADE;')
  db.session.commit()
