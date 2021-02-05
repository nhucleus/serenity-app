from .db import db

class Drawing(db.Model):
  __tablename__ = 'drawings'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(100), nullable=False)
  image = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, unique=True, nullable=False)


  user = db.relationship("User", back_populates="drawings")


  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "user_firstname": self.user.first_name,
      "user_lastname": self.user.last_name,
      "title": self.title,
      "image": self.image,
      "created_at": self.created_at
    }