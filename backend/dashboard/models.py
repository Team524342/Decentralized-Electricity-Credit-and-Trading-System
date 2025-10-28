# E:\Decentralized-Electricity-Credit-and-Trading-System\backend\dashboard\models.py
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
    email=models.EmailField(primary_key=True)
    password=models.CharField(max_length=255)
    role=models.CharField(max_length=20,choices=ROLE_CHOICES)
    wallet_address=models.CharField(max_length=255,blank=True,null=True)
    location=models.CharField(max_length=100,blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    class Meta:
        managed = False 
        db_table='users'

    def save(self,*args,**kwargs):
        from django.contrib.auth.hashers import make_password
        #automatically hash password before saving
        if not self.pk or not self.password.startswith('pbkdf2_'):
            self.password=make_password(self.password)
        super().save(*args,**kwargs)
        
    def __str__(self):
        return f"{self.name}({self.role})"
    
   #smart meter
class SmartMeter(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='meters')
    meter_number=models.CharField(max_length=100,unique=True)
    location=models.CharField(max_length=200,blank=True,null=True)
    status=models.CharField(max_length=20,choices=[('acitve','Active'),('inactive','Inactive')],default='active')
    def __str__(self):
        return f"{self.meter_number}-{self.user.name}"


# /admin settings    # 
class AdminSetting(models.Model):
    setting_key=models.CharField(max_length=100,unique=True)
    setting_value=models.CharField(max_length=255,blank=True,null=True)
    last_updated=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.setting_key} ={self.setting_value}" 
    

#system log 
class Systemlog(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,related_name='logs')
    action=models.CharField(max_length=255)
    description=models.TextField(blank=True,null=True)
    log_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.action}|{self.log_time}"
# meter reading
class MeterReading(models.Model):
    meter=models.ForeignKey(SmartMeter,on_delete=models.CASCADE,related_name='readings')
    reading_date=models.DateTimeField(auto_now_add=True)   
    energy_generated=models.DecimalField(max_digits=10,decimal_places=2,default=0.00)
    energy_consumed=models.DecimalField(max_digits=10,decimal_places=2,default=0.00)
    @property
    def net_energy(self):
        return self.energy_generated-self.energy_consumed
    def __str__(self):
        return f"{self.meter.meter_number}|{self.reading_date}"  



# 

