from .db import db
from .friendship import Friendship
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(40), nullable = False)
  last_name = db.Column(db.String(40), nullable = False)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable=False)
  avatar = db.Column(db.Text, default="%PUBLIC_URL%/avatar.png")
  
  
  journal_entries = db.relationship("Journal", back_populates="user")
  drawings = db.relationship("Drawing", back_populates="user")
  # messages = db.relationship("Message", foreign_keys="messages.user_id")
  friends = []
  


  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def get_friends(self):
    friendships = Friendship.query.filter(Friendship.user_id == self.id).all()
    self.friends = [friendship.friend for friendship in friendships]
    self.friends = [friend.to_dict_friend() for friend in self.friends]
    self.friends = {friend["id"]: friend for friend in self.friends}
  
  def check_password(self, password):
    return check_password_hash(self.password, password)

  
  def to_dict(self):
    self.get_friends()
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "username": self.username,
      "email": self.email,
      "avatar": self.avatar,
      "friends": self.friends
      }

  def to_dict_friend(self):
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "username": self.username,
      "avatar": self.avatar,
      }

  def to_dict_full(self):
    self.get_friends()
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "username": self.username,
      "email": self.email,
      "journal_entries": journal_entries.to_dict(),
      "friends": [user.to_dict() for user in self.friends]
      }