using Nelibur.ObjectMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.BLL.Interfaces;
using ToDoApp.Common.Model.Dto;
using ToDoApp.DAL.Entities;
using ToDoApp.DAL.Interfaces;

namespace ToDoApp.BLL.Services
{

    public class TaskService : ITaskService
    {
      
        private readonly IUnitOfWork _unitOfWork;

        public TaskService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        void build()
        {
            TinyMapper.Bind<DtoTask, Tasks>(config =>
            {

            });
            TinyMapper.Bind<Tasks, DtoTask>();
        }

        public async Task AddTaskAsync(DtoTask task)
        {
            build();
           
           
                Tasks tasks = new Tasks();
                TinyMapper.Map(task, tasks);

                await _unitOfWork.TaskDataAccess.AddTaskAsync(tasks);
                await _unitOfWork.CommitAsync();
            
        }

        public async Task<List<Tasks>?> GetTaskAsync(int userID)
        {
            
                List<Tasks> user = await _unitOfWork.TaskDataAccess.GetTaskAsync(userID);
            return user;
            
        }

        public async Task RemoveTaskAsync(int taskId, int userID)
        {
            
                await _unitOfWork.TaskDataAccess.RemoveTaskAsync(taskId, userID);
                await _unitOfWork.CommitAsync();
            
        }

        public void RemoveTaskAll()
        {
           
                _unitOfWork.TaskDataAccess.RemoveTaskAll();
                _unitOfWork.CommitAsync().Wait();
            
        }

        public async Task UpdateTaskAsync(DtoTask task)
        {
            build();
           
            Tasks tasks = new Tasks();
            TinyMapper.Map(task, tasks);
            await _unitOfWork.TaskDataAccess.UpdateTaskAsync(tasks);
            await _unitOfWork.CommitAsync();
            
        }
    }
}
