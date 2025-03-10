using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppoinmetnt.DataAccessLayer.Context;
using AcademicAppoinmetnt.DataAccessLayer.Repositories;
using AcademicAppointment.BusinessLayer.Abstract;
using AcademicAppointment.BusinessLayer.Concrete;
using AcademicAppointment.EntityLayer.Identity;
using AcademicAppointment.Presentation.Models;
using AcademicAppointment.Presentation.Services;
using Hangfire;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Veritabanı Bağlantısı
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<IdentityContext>(options => options.UseSqlServer(connectionString));

// Identity Servisleri
builder.Services.AddIdentity<AppUser, AppRole>()
    .AddErrorDescriber<CustomIdentityValidation>() 
    .AddEntityFrameworkStores<IdentityContext>()
    .AddDefaultTokenProviders();

// Hangfire'ı SQL Server ile yapılandırıyoruz
builder.Services.AddHangfire(config =>
    config.UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHangfireServer();  // Hangfire server'ını başlatıyoruz

builder.Services.AddScoped<IAppUserRepository, AppUserRepository>();
builder.Services.AddScoped<IAppRoleRepository, AppRoleRepository>();
builder.Services.AddScoped<IGenericRepository<AppUser>, GenericRepository<AppUser>>();
builder.Services.AddScoped<IGenericRepository<AppRole>, GenericRepository<AppRole>>();
builder.Services.AddScoped<IAppUserService, AppUserService>();
builder.Services.AddScoped<IAppRoleService, AppRoleService>();
builder.Services.AddScoped<IGenericService<AppUser>, GenericService<AppUser>>();
builder.Services.AddScoped<IGenericService<AppRole>, GenericService<AppRole>>();
builder.Services.AddScoped<IMailService, MailService>();




builder.Services.AddControllersWithViews();

var app = builder.Build();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
// Hangfire Dashboard'ını akt
// if ediyoruz
app.UseHangfireDashboard("/hangfire");  // Dashboard'ı "/hangfire" yolu üzerinden erişilebilir kıldık

RecurringJob.AddOrUpdate<EmailVerificationCleanupService>(
    service => service.DeleteUnverifiedAccounts(),
    "0 0 0 * * *"); // Her gün gece yarısı çalışacak



app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");
app.Run();
