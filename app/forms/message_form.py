from flask_wtf import FlaskForm
from wtforms import StringField, TextField, IntegerField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
  subject = StringField('Subject', validators=[DataRequired()])
  body = TextField('Say something nice...', validators=[DataRequired()])
  friend_id = IntegerField('Friend', validators=[DataRequired()])