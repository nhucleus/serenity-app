from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
  email = field.data
  username = field.data
  user = User.query.filter(User.email == email or User.username == username).first()
  if not user:
    raise ValidationError("Email or username provided does not exist.")


def password_matches(form, field):
  password = field.data
  email = form.data['email']
  username = form.data['username']
  user = User.query.filter(User.email == email or User.username == username).first()
  if not user:
    raise ValidationError("No such user exists.")
  if not user.check_password(password):
    raise ValidationError("Password provided is incorrect.")


class LoginForm(FlaskForm):
  credentials = StringField('Username or Email', validators=[DataRequired(), user_exists])
  password = StringField('Password', validators=[DataRequired(), password_matches])
