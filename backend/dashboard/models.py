from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.
class User(models.Model):
    ROLE_CHOICES=[
        ('producer','Producer'),
        ('consumer','Consumer'),
        ('admin','Admin'),
    ]
    name =models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=255)
    role=models.CharField(max_length=20,choices=ROLE_CHOICES)
    wallet_address=models.CharField(max_length=255,blank=True,null=True)
    location=models.CharField(max_length=100,blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table='users'
    def save(self,*args,**kwargs):
        from django.contrib.auth.hashers import make_password
        #automatically hash password before saving
        if not self.pk or not self.password.startswith('pbkdf2_'):
            self.password=make_password(self.password)
            super().save(*args,**kwargs)
    def __str__(self):
        return f"{self.name}({self.role})"