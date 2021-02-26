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

  demo7 = User(first_name='Melanie', last_name='Smith',
              username='mellybelly', email='demomelly@aa.io', password='password', avatar='https://image.freepik.com/free-vector/portrait-beautiful-girl-with-tiara-her-head_1196-849.jpg')

  demo8 = User(first_name='Derrick', last_name='Chu',
              username='chewy', email='demochewy@aa.io', password='password', avatar='https://i.pinimg.com/originals/84/b1/cf/84b1cfe57b0618d58c5d35ea3ae6c225.jpg')

  demo9 = User(first_name='Stephanie', last_name='Dale',
              username='stephyxd', email='demosteph@aa.io', password='password', avatar='https://image.freepik.com/free-vector/avatar-girl-cute-female-image-ordinary-girl-fashionable-flat-style_15870-697.jpg')

  demo10 = User(first_name='Molly', last_name='Fitzgerald',
              username='mollyfitz', email='demomolly@aa.io', password='password', avatar='https://i.pinimg.com/474x/cd/7d/7d/cd7d7de1813d251ccf87b2dbe52c2863.jpg')
  
  demo11 = User(first_name='Karen', last_name='Cruda',
              username='karencruda', email='demokc@aa.io', password='password', avatar='https://i.pinimg.com/originals/05/9a/6f/059a6f3e7a59ba3d2370a9a39b961982.jpg')

  demo12 = User(first_name='Nathan', last_name='Ramirez',
              username='natexramirez', email='demonate@aa.io', password='password', avatar='https://wallpapercave.com/wp/wp1877515.jpg')


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
  db.session.add(demo12)

  db.session.commit()


def undo_users():
  db.session.execute('TRUNCATE users CASCADE;')
  db.session.commit()