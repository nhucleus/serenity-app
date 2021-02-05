from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(40), nullable = False)
  last_name = db.Column(db.String(40), nullable = False)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  
  friends = db.Table(
    "friends",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("friend_id", db.Integer, db.ForeignKey("users.id"))
  )

  friendships = db.relationship(
    "User",
    secondary=friends,
    primaryjoin=(friends.c.user_id == id),
    secondaryjoin=(friends.c.friend_id == id),
    backref=db.backref("friends", lazy="dynamic"),
    lazy="dynamic"
  )
  journal_entries = db.relationship("Journal", back_populates="user")
  drawings = db.relationship("Drawing", back_populates="user")
  messages = db.relationship("Message", back_populates="user")


  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  
  def check_password(self, password):
    return check_password_hash(self.password, password)

  
  def to_dict(self):
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "username": self.username,
      "email": self.email,
      "journal_entries": journal_entries.to_dict()
      }