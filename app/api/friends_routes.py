from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, User, Friendship

friends_routes = Blueprint('friends', __name__)

@friends_routes.route('/search/<string:query>')
@login_required
def search_user(query):
    users = User.query.filter(User.username.ilike(f"%{query}%") | (User.first_name + " " + User.last_name).ilike(f"%{query}%")).limit(10)
    return {"results": [user.to_dict_friend() for user in users]}

@friends_routes.route('/<int:id>/add')
@login_required
def add_friend(id):
    friendship = Friendship(
        user_id = current_user.id,
        friend_id = id
    )
    db.session.add(friendship)
    db.session.commit()
    if friendship:
        return {"message": "Success"}
    else:
        return {"errors": "FAILURE"}
    