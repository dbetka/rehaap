from django.db import models
from users.models import Doctor, Patient
from common.models import Documents, Images


class PatientInjuries(models.Model):

    name = models.CharField(max_length=200)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    description = models.TextField()
    documents = models.ManyToManyField(Documents)
    images = models.ManyToManyField(Images)
