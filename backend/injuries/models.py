from django.db import models
from users.models import Doctor, Patient
from common.models import Documents, Images


class PatientInjuries(models.Model):

    name = models.CharField(max_length=200)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    description = models.TextField()


class InjuriesDocuments(models.Model):

    injury = models.ForeignKey(PatientInjuries, on_delete=models.CASCADE)
    document = models.ForeignKey(Documents, on_delete=models.CASCADE)


class InjuriesImages(models.Model):

    injury = models.ForeignKey(PatientInjuries, on_delete=models.CASCADE)
    image = models.ForeignKey(Images, on_delete=models.CASCADE)
