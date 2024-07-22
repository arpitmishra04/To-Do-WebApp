using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.Common.Model.Dto;
using ToDoApp.DAL.Entities;

namespace ToDoApp.BLL.Interfaces
{
    public interface ITaskService
    {
        Task AddTaskAsync(DtoTask task);
        Task<List<Tasks>?> GetTaskAsync(int userID);
        Task RemoveTaskAsync(int taskId, int userID);
        void RemoveTaskAll();
        Task UpdateTaskAsync(DtoTask task);
    }
}
