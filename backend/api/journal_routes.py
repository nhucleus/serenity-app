from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint
from app.models import Journal
from flask_login import login_required, current_user
from ..forms import JournalForm

journal_routes = Blueprint('journal', __name__)


@journal_routes.route('/entries')
@login_required
def journal_entries():
  journal_entries = Journal.query.filter(Journal.user_id == id)
  return {"journal_entries": [journal.to_dict() for journal in journal_entries]}


@journal_routes.route('/<int:id>')
@login_required
def journal_entry():
  journal_entry = Journal.query.get(id)


@journal_routes.route('/new', methods=["POST"])
@login_required
def new_entry():
  form = JournalForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    journal_entry = Journal(
      user_id=current_user.id,
      title=form.data['title'],
      body=form.data['body'],
      photo=form.data['photo'],
      created_at=Date.today()
    )
    db.session.add(journal_entry)
    db.session.commit()
    return journal_entry.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}


@journal_routes.route('/<int:id>/delete', methods=["DELETE"])
def delete_entry(id):
  journal_entry = Journal.query.get(id)
  db.session.delete(journal_entry)
  db.session.commit()
  return {"message": "Entry deleted successfully"}

