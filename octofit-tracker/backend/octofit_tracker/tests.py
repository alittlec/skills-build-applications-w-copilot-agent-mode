from django.test import SimpleTestCase, TestCase
from .models import User, Team, Workout, Activity, Leaderboard


class UrlTests(SimpleTestCase):
    def test_root_redirects_to_api_root(self):
        response = self.client.get('/')

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, '/api/')

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass', team=self.team)
        self.workout = Workout.objects.create(name='Test Workout', description='Test Desc')
        self.activity = Activity.objects.create(user=self.user, workout=self.workout, duration=30)
        self.leaderboard = Leaderboard.objects.create(user=self.user, score=100)

    def test_team(self):
        self.assertEqual(self.team.name, 'Test Team')

    def test_user(self):
        self.assertEqual(self.user.email, 'test@example.com')

    def test_workout(self):
        self.assertEqual(self.workout.name, 'Test Workout')

    def test_activity(self):
        self.assertEqual(self.activity.duration, 30)

    def test_leaderboard(self):
        self.assertEqual(self.leaderboard.score, 100)
