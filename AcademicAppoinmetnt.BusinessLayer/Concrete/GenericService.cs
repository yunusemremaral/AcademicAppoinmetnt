using AcademicAppoinmetnt.DataAccessLayer.Abstract;
using AcademicAppointment.BusinessLayer.Abstract;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AcademicAppointment.BusinessLayer.Concrete
{
    public class GenericService<T> : IGenericService<T> where T : class
    {
        private readonly IGenericRepository<T> _repository;

        public GenericService(IGenericRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task<T> TGetByIdAsync(string id) => await _repository.GetByIdAsync(id);
        public async Task<IEnumerable<T>> TGetAllAsync() => await _repository.GetAllAsync();
        public async Task<IEnumerable<T>> TFindAsync(Expression<Func<T, bool>> predicate) => await _repository.FindAsync(predicate);
        public async Task<T> TFirstOrDefaultAsync(Expression<Func<T, bool>> predicate) => await _repository.FirstOrDefaultAsync(predicate);
        public async Task TAddAsync(T entity) => await _repository.AddAsync(entity);
        public async Task TUpdateAsync(T entity) => await _repository.UpdateAsync(entity);
        public async Task TDeleteAsync(T entity) => await _repository.DeleteAsync(entity);
    }
}
