using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AcademicAppoinmetnt.DataAccessLayer.Context;
using AcademicAppoinmetnt.EntityLayer.Identity;

var builder = WebApplication.CreateBuilder(args);

// Veritabanı bağlantısı
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<IdentityContext>(options =>
    options.UseSqlServer(connectionString));

// Identity servislerini ekle
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;

    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<IdentityContext>()
.AddDefaultTokenProviders();

// Cookie ayarları
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
    options.LoginPath = "/Account/Login"; // Giriş sayfası
    options.AccessDeniedPath = "/Account/AccessDenied"; // Yetkisiz erişim sayfası
});

// MVC servislerini ekle
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Middleware'leri ekle
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication(); // Kimlik doğrulama
app.UseAuthorization(); // Yetkilendirme

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
