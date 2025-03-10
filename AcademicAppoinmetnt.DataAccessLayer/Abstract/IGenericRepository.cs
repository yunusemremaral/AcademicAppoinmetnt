using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.DataAccessLayer.Abstract
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetByIdAsync(string id); // ID'ye göre getir
        Task<IEnumerable<T>> GetAllAsync(); // Tüm verileri getir
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate); // Koşula göre liste getir
        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate); // Koşula göre ilkini getir
        Task AddAsync(T entity); // Yeni kayıt ekle
        Task UpdateAsync(T entity); // Güncelle
        Task DeleteAsync(T entity); // Sil
    }
}
