from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint
from app.models import Drawing
from flask_login import login_required
from ..forms import DrawingForm

canvas_routes = Blueprint('canvas', __name__)

@canvas_routes.route('/drawings')
@login_required
def drawings():
  drawings = Drawing.query.filter(Drawing.user_id == id)
  return {"drawings": [drawing.to_dict() for drawing in drawings]}

@canvas_routes.route('/<int:id>')
@login_required
def drawing():
  drawing = Drawing.query.get(id)

@canvas_routes.route('/new', methods=["POST"])
@login_required
def new_drawing():
  form = DrawingForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_drawing = Drawing(
      title=form.data['title'],
      image=form.data['image']
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