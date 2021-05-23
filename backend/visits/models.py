from django.db import models
from users.models import Doctor, Patient


class PatientVisits(models.Model):

    datetime = models.DateTimeField()
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
