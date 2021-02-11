from .db import db

class Message(db.Model):
  __tablename__ = 'messages'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  subject = db.Column(db.String(250), nullable=False)
  body = db.Column(db.String(500), nullable=False)
  friend_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  # user = db.relationship("User", back_populates="messages")
  sender = db.relationship("User", foreign_keys=user_id)
  recipient = db.relationship("User", foreign_keys=friend_id)
  

def to_dict(self):
  return {
    "id": self.id,
    "user_id": self.user_id,
    "subject": self.subject,
    "body": self.body,
    "friend_id": self.friend_id
  }