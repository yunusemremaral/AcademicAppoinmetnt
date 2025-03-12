using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AcademicAppointment.BusinessLayer.Abstract
{
    public interface IGenericService<T> where T : class
    {
        
        Task<T> TGetIntByIdAsync(int id);

        Task<T> TGetByIdAsync(string id);
        Task<IEnumerable<T>> TGetAllAsync();
        Task<IEnumerable<T>> TFindAsync(Expression<Func<T, bool>> predicate);
        Task<T> TFirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
        Task TAddAsync(T entity);
        Task TUpdateAsync(T entity);
        Task TDeleteAsync(T entity);
    }
}
