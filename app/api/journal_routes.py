from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint, request
from app.models import Journal, db
from flask_login import login_required, current_user
from ..forms import JournalForm
import datetime

journal_routes = Blueprint('journal', __name__)


@journal_routes.route('/entries')
@login_required
def journal_entries():
  journal_entries = Journal.query.filter(Journal.user_id == current_user.id).all()
  journal_entries_list = [journal.to_dict() for journal in journal_entries]
  return {"journal_entries": {entry["id"]: entry for entry in journal_entries_list}}


@journal_routes.route('/<int:id>')
@login_required
def journal_entry(id):
  journal_entry = Journal.query.get(id)


@journal_routes.route('/current')
@login_required
def current_journal_entry():
  date = datetime.datetime.now()
  month = date.month
  day = date.day
  year = date.year

  journal_entry = Journal.query.filter(Journal.user_id == current_user.id).order_by(Journal.created_at.desc()).first()
  journal_date = journal_entry.created_at
  journal_month = journal_date.month
  journal_day = journal_date.day
  journal_year = journal_date.year
  if month == journal_month and day == journal_day and year == journal_year:
    return journal_entry.to_dict()
  return {"errors": "No journal for today"}


@journal_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_journal_entry(id):
  journal_entry = Journal.query.get(id)
  form = JournalForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit() and not form.data['photo']:
    journal_entry.title = form.data['title']
    journal_entry.body = form.data['body']
    db.session.commit()
    return journal_entry.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}
  

@journal_routes.route('/new', methods=["POST"])
@login_required
def new_entry():
  form = JournalForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit() and form.data['photo']:
    journal_entry = Journal(
      user_id=current_user.id,
      title=form.data['title'],
      body=form.data['body'],
      photo=form.data['photo'],
    )
    db.session.add(journal_entry)
    db.session.commit()
  elif form.validate_on_submit() and not form.data['photo']:
    journal_entry = Journal(
      user_id=current_user.id,
      title=form.data['title'],
      body=form.data['body'],
      created_at=datetime.datetime.now()
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

