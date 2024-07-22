using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.common.dto;
using ToDoApp.DAL.Entities;

namespace ToDoApp.Contracts.contract
{
    public interface ITaskDataAccess
    {
        Task<Tasks> GetTaskAsync( );
        Task addTaskAsync();

        Task removeTaskAsync();

        Task updateTaskAsync();
    }
}
