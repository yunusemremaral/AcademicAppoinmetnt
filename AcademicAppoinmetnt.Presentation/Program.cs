using AcademicAppoinmetnt.EntityLayer.Identity;
using AcademicAppoinmetnt.DataAccessLayer.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Baðlantý dizesini al
var connectionString = builder.Configuration.GetConnectionString("IdentityConnection");

// Veritabaný baðlantýsýný ve Identity hizmetlerini ekle
builder.Services.AddDbContext<IdentityContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    // Parola gereksinimlerini yapýlandýr
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequiredUniqueChars = 1;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;

    // Kilitlenme politikalarýný yapýlandýr
    options.Lockout.AllowedForNewUsers = true;
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);

    // Kullanýcý gereksinimlerini yapýlandýr
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<IdentityContext>()
.AddDefaultTokenProviders();

// Diðer hizmetleri ekle
builder.Services.AddControllersWithViews();

// Kimlik doðrulama ve yetkilendirme hizmetlerini ekle
builder.Services.AddAuthentication()
    .AddCookie(IdentityConstants.ApplicationScheme);
builder.Services.AddAuthorization();

var app = builder.Build();

// HSTS'yi yalnýzca üretim ortamýnda etkinleþtir
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Kimlik doðrulama ve yetkilendirmeyi ara katman olarak ekle
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
