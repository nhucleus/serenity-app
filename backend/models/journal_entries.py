from .db import db

class Jounal(db.Model):
  __tablename__ = 'journal_entries'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(100), nullable=False)
  body = db.Column(db.Text, nullable=False)
  photo = db.Column(db.String)
  created_at = db.Column(db.Date.today(), unique=True, nullable=False)


  user = db.relationship("User", back_populates="journal_entries")


  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "user_firstname": self.user.first_name,
      "user_lastname": self.user.last_name,
      "title": self.title,
      "body": self.body,
      "photo": self.photo,
      "created_at": self.created_at
    }