from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired

class JournalForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  body = TextField('What made you happy today?', validators=[DataRequired()])