from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def user_exists(form, field):
  email = field.data
  username = field.data
  user = User.query.filter(User.email == email or User.username == username).first()
  if user:
    raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
  first_name = StringField('First Name', validators=[DataRequired()])
  last_name = StringField('Last Name', validators=[DataRequired()])
  username = StringField('Username', validators=[DataRequired(), user_exists])
  email = StringField('Email', validators=[DataRequired(), user_exists])
  password = StringField('Password', validators=[DataRequired()])
  # avatarUrl = TextField('Avatar')