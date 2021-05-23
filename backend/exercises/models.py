from django.db import models
from common.models import Images, Videos


class Exercises(models.Model):

    name = models.CharField(max_length=100)
    description = models.TextField()
    images = models.ManyToManyField(Images)
    videos = models.ManyToManyField(Videos)
