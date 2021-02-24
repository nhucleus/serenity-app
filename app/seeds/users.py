from werkzeug.security import generate_password_hash
from app.models import db, User

def seed_users():
  demo = User(first_name='Demo', last_name='User',
              username='Demo', email='demo@aa.io', password='password')

  demo1 = User(first_name='Cece', last_name='Love',
              username='cecexlove', email='democece@aa.io', password='password', avatar='https://www.publicdomainpictures.net/pictures/270000/nahled/avatar-people-person-business-u-15354603894rE.jpg')
  
  demo2 = User(first_name='Natalie', last_name='Brewer',
              username='brewinuptrouble', email='demobrewer@aa.io', password='password', avatar='https://image.freepik.com/free-vector/woman-profile-cartoon_18591-58475.jpg')

  demo3 = User(first_name='Devon', last_name='Duke',
              username='dukexdevon', email='demoduke@aa.io', password='password', avatar='https://image.freepik.com/free-vector/woman-profile-cartoon_18591-58477.jpg')
  
  demo4 = User(first_name='Emily', last_name='Hosier',
              username='emster', email='demoem@aa.io', password='password', avatar='https://image.freepik.com/free-vector/woman-profile-cartoon_18591-58476.jpg')

  demo5 = User(first_name='Sara', last_name='Tran',
              username='saraxtran', email='demotran@aa.io', password='password', avatar='https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=1.0&px=999')

  demo6 = User(first_name='Daniel', last_name='Miller',
              username='bobbyxd', email='demobobby@aa.io', password='password', avatar='https://www.publicdomainpictures.net/pictures/270000/nahled/avatar-people-person-business-.jpg')


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