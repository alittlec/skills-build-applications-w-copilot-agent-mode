from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker import models as octo_models

from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Clear collections
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users
        users = [
            User(email='ironman@marvel.com', username='ironman', team=marvel),
            User(email='captain@marvel.com', username='captain', team=marvel),
            User(email='batman@dc.com', username='batman', team=dc),
            User(email='superman@dc.com', username='superman', team=dc),
        ]
        for user in users:
            user.set_password('password')
            user.save()

        # Create Workouts
        workout1 = Workout.objects.create(name='Pushups', description='Upper body strength')
        workout2 = Workout.objects.create(name='Running', description='Cardio endurance')

        # Create Activities
        Activity.objects.create(user=users[0], workout=workout1, duration=30)
        Activity.objects.create(user=users[1], workout=workout2, duration=45)
        Activity.objects.create(user=users[2], workout=workout1, duration=20)
        Activity.objects.create(user=users[3], workout=workout2, duration=60)

        # Create Leaderboard
        Leaderboard.objects.create(user=users[0], score=100)
        Leaderboard.objects.create(user=users[1], score=90)
        Leaderboard.objects.create(user=users[2], score=80)
        Leaderboard.objects.create(user=users[3], score=70)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
