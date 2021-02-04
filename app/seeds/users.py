from werkzeug.security import generate_password_hash
from app.models import db, User

def seed_users():
  demo = User(first_name='Demo', last_name='User',
              username='Demo', email='demo@aa.io', password='password')
  
  db.session.add(demo)

  db.session.commit()


def undo_users():
  db.session.execute('TRUNCATE users;')
  db.session.commit()