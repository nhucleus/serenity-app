from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, request
from app.models import Drawing, db
from flask_login import login_required, current_user
from ..forms import DrawingForm
import datetime

canvas_routes = Blueprint('canvas', __name__)

@canvas_routes.route('/drawings')
@login_required
def drawings():
  def month_filter(drawing):
    if entry.created_at.month is month:
      return True
    else:
      return False
  date = datetime.datetime.now()
  month = date.month
  year = date.year

  drawings = Drawing.query.filter(Drawing.user_id == current_user.id).limit(31)
  filtered_drawings = filter(month_filter, drawings)
  drawings_list = [drawing.to_dict() for drawing in drawings]

  return {"drawings": {drawing["id"]: drawing for drawing in drawings_list}}

@canvas_routes.route('/<int:id>')
@login_required
def drawing():
  drawing = Drawing.query.get(id)


@canvas_routes.route('/current')
@login_required
def current_drawing():
  date = datetime.datetime.now()
  month = date.month
  day = date.day
  year = date.year

  drawing = Drawing.query.filter(Drawing.user_id == current_user.id).order_by(Drawing.created_at.desc()).first()
  drawing_date = drawing.created_at
  drawing_month = drawing_date.month
  drawing_day = drawing_date.day
  drawing_year = drawing_date.year

  if month == drawing_month and day == drawing_day and year == drawing_year:
    return drawing.to_dict()
  return {"errors": "No drawing for today"}

@canvas_routes.route('/new', methods=["POST"])
@login_required
def new_drawing():
  form = DrawingForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_drawing = Drawing(
      user_id=current_user.id,
      title=form.data['title'],
      image=form.data['image'],
      created_at=datetime.datetime.now()
    )
    db.session.add(new_drawing)
    db.session.commit()
    return new_drawing.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}

@canvas_routes.route('/<int:id>/delete', methods=["DELETE"])
def delete_drawing(id):
  drawing = Drawing.query.get(id)
  db.session.delete(journal_entry)
  db.session.commit()
  return {"message": "Entry deleted successfully"}