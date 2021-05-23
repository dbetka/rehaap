from django.db import models
from common.models import Images, Videos


class Exercises(models.Model):

    name = models.CharField(max_length=100)
    description = models.TextField()


class ExercisesImages(models.Model):

    exercise = models.ForeignKey(Exercises, on_delete=models.CASCADE)
    image = models.ForeignKey(Images, on_delete=models.CASCADE)


class ExercisesVideos(models.Model):

    exercise = models.ForeignKey(Exercises, on_delete=models.CASCADE)
    image = models.ForeignKey(Videos, on_delete=models.CASCADE)
