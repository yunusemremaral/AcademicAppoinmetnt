using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.DataAccessLayer.Abstract
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetByIdAsync(string id); // Identity ID'leri string olduğu için
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
        Task<int> SaveChangesAsync(); // Save işlemi burada olacak
    }
}
