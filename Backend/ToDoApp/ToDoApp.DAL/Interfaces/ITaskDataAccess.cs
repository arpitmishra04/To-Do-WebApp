using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ToDoApp.DAL.Entities;

namespace ToDoApp.DAL.Interfaces
{
    public interface ITaskDataAccess
    {
        Task<List<Tasks>> GetTaskAsync(int userID);
        Task AddTaskAsync(Tasks task);

        Task RemoveTaskAsync(int taskId,int UserID);

        Task UpdateTaskAsync(Tasks task);

        void RemoveTaskAll();
    }
}
