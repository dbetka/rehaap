from django.db import models


class Documents(models.Model):
    document = models.URLField()


class Images(models.Model):
    image = models.ImageField()


class Videos(models.Model):
    link = models.URLField()
