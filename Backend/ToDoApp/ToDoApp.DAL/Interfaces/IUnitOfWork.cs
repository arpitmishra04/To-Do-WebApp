using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoApp.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        ITaskDataAccess TaskDataAccess { get; }
        IUserDataAccess UserDataAccess { get; }
        Task<int> CommitAsync();
    }
}
