from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class DrawingForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  image = StringField('Drawing', validators=[DataRequired()])