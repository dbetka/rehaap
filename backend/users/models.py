from django.db import models


class Person(models.Model):

    email = models.EmailField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    telephone = models.CharField(max_length=15)
    birth_date = models.DateField()

    class Meta:
        abstract = True


class Patient(Person):
    pass


class Doctor(Person):
    pass


class Admin(Person):
    pass


class UnconfirmedAccounts(models.Model):

    verify_code = models.CharField(max_length=10)
    creation_date = models.DateTimeField()
