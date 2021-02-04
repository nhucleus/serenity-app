from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired

class JounalForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  body = TextField('What made you happy today?', validators=[DataRequired()])
  photo = StringField('Upload an optional photo')