from werkzeug.security import generate_password_hash
from app.models import db, User

def seed_users():
  demo = User(first_name='Demo', last_name='User',
              username='Demo', email='demo@aa.io', password='password')

  demo1 = User(first_name='Cece', last_name='Love',
              username='cecexlove', email='democece@aa.io', password='password')
  
  demo2 = User(first_name='Natalie', last_name='Brewer',
              username='brewinuptrouble', email='demobrewer@aa.io', password='password')

  demo3 = User(first_name='Devon', last_name='Duke',
              username='dukexdevon', email='demoduke@aa.io', password='password')
  
  demo4 = User(first_name='Emily', last_name='Hosier',
              username='emster', email='demoem@aa.io', password='password')

  demo5 = User(first_name='Sara', last_name='Tran',
              username='saraxtran', email='demotran@aa.io', password='password')

  demo6 = User(first_name='Daniel', last_name='Miller',
              username='bobbyxd', email='demobobby@aa.io', password='password')


  db.session.add(demo)
  db.session.add(demo1)
  db.session.add(demo2)
  db.session.add(demo3)
  db.session.add(demo4)
  db.session.add(demo5)
  db.session.add(demo6)

  db.session.commit()


def undo_users():
  db.session.execute('TRUNCATE users CASCADE;')
  db.session.commit()