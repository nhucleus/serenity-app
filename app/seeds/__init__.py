from flask.cli import AppGroup
from .users import seed_users, undo_users
from .journal_entries import seed_journals, undo_journals
from .drawings import seed_drawings, undo_drawings
from .friendships import seed_friends, undo_friends
from .messages import seed_messages, undo_messages

seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    seed_users()
    seed_journals()
    seed_drawings()
    seed_friends()
    seed_messages()

@seed_commands.command('undo')
def undo():
    undo_users()
    undo_journals()
    undo_drawings()
    undo_friends()
    undo_messages()