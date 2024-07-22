using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.DAL.Entities;
using ToDoApp.DAL.Interfaces;

namespace ToDoApp.DAL
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly ToDoAppDbContext _context;
        private ITaskDataAccess _taskDataAccess;
        private IUserDataAccess _userDataAccess;

        public UnitOfWork(ToDoAppDbContext context, ITaskDataAccess taskDataAccess, IUserDataAccess userDataAccess)
        {
            _taskDataAccess = taskDataAccess;
            _userDataAccess = userDataAccess;
            _context = context;
        }

        public ITaskDataAccess TaskDataAccess => _taskDataAccess;
        public IUserDataAccess UserDataAccess => _userDataAccess;

        public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }

      
    }
}
