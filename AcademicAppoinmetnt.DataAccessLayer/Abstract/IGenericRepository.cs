using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppoinmetnt.DataAccessLayer.Abstract
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetByIdAsync(string id); // Identity'de ID'ler string tipinde
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    }

}
