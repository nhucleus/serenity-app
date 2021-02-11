from .db import db

class Friendship(db.Model):
  __tablename__ = "friendships"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  friend_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  viewed = db.Column(db.Boolean, nullable=False, default=False)

  user = db.relationship('User', foreign_keys=user_id)
  friend = db.relationship('User', foreign_keys=friend_id)


def to_dict(self):
  return {
    "id": self.id,
    "userId": self.user_id,
    "friendId": self.friend_id, 
  }