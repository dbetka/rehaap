from django.db import models


class Exercises(models.Model):

    name = models.CharField(max_length=100)
    description = models.TextField()


class Images(models.Model):
    image = models.ImageField()


class Videos(models.Model):
    link = models.URLField()


class ExercisesImages(models.Model):

    exercise = models.ForeignKey(Exercises, on_delete=models.CASCADE)
    image = models.ForeignKey(Images, on_delete=models.CASCADE)
