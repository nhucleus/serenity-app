from .auth_routes import validation_errors_to_error_messages
from flask import Blueprint
from app.models import Message
from flask_login import login_required, current_user
from ..forms import MessageForm

message_routes = Blueprint('inbox', __name__)

@message_routes.route('/')
@login_required
def messages():
  messages = Message.query.filter(Message.user_id == id)
  return {"messages": [message.to_dict() for message in messages]}


@message_routes.route('/new')
@login_required
def new_message():
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    message = Message(
      user_id=current_user.id,
      subject=form.data['subject'],
      body=form.data['body'],
      friend_id=form.data['friend_id']
    )
    db.session.add(message)
    db.session.commit()
    return message.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}