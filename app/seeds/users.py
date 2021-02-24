from werkzeug.security import generate_password_hash
from app.models import db, User

def seed_users():
  demo = User(first_name='Demo', last_name='User',
              username='Demo', email='demo@aa.io', password='password')

  demo1 = User(first_name='Cece', last_name='Love',
              username='cecexlove', email='democece@aa.io', password='password', avatar='https://pbs.twimg.com/media/DG0QeSAVYAAGblk.jpg')
  
  demo2 = User(first_name='Natalie', last_name='Brewer',
              username='brewinuptrouble', email='demobrewer@aa.io', password='password', avatar='https://i.pinimg.com/originals/6d/f6/eb/6df6eb624d5d5d694f3e65482d722441.jpg')

  demo3 = User(first_name='Devon', last_name='Duke',
              username='dukexdevon', email='demoduke@aa.io', password='password', avatar='https://i.pinimg.com/236x/88/2f/7e/882f7ef15e499bc548b6f29b0446ac0f.jpg')
  
  demo4 = User(first_name='Emily', last_name='Hosier',
              username='emster', email='demoem@aa.io', password='password', avatar='https://image.freepik.com/free-vector/african-american-girl-portrait-cartoon-character-vector-illustration_24640-66033.jpg')

  demo5 = User(first_name='Sara', last_name='Tran',
              username='saraxtran', email='demotran@aa.io', password='password', avatar='https://i.pinimg.com/280x280_RS/b8/e1/78/b8e178f65a6cfe0c56af68f33cb22a6e.jpg')

  demo6 = User(first_name='Daniel', last_name='Miller',
              username='bobbyxd', email='demobobby@aa.io', password='password', avatar='https://image.freepik.com/free-vector/emotion-young-man-cartoon-scared-bearded-man_15870-722.jpg')


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