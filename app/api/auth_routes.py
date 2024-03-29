from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user
from werkzeug.utils import secure_filename
from ..config import Config
from ..helpers import *

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('')
def authenticate():
    """
    Authenticates a user.
    """
    print(current_user)
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
  """
  Logs a user out
  """
  logout_user()
  return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
  """
  Creates a new user and logs them in
  """
  form = SignUpForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    user = User(
      first_name=form.data['first_name'],
      last_name=form.data['last_name'],
      username=form.data['username'],
      email=form.data['email'],
      password=form.data['password'],
    )
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return user.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/avatar', methods=['POST'])
def edit_avatar():
  image = request.files["image"]
  image.filename = secure_filename(image.filename)
  imgUrl = upload_file_to_s3(image, Config.S3_BUCKET)
  user = User.query.get(current_user.id)
  user.avatar = imgUrl
  db.session.commit()
  return {'avatar': imgUrl}


@auth_routes.route('/unauthorized')
def unauthorized():
  """
  Returns unauthorized JSON when flask-login authentication fails
  """
  return {'errors': ['Unauthorized']}, 401