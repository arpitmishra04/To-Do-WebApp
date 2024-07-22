using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoApp.DAL.Entities;
using ToDoApp.DAL.Interfaces;

namespace ToDoApp.DAL
{
    public class TaskDataAccess : ITaskDataAccess
    {
        private readonly ToDoAppDbContext _context;
        public TaskDataAccess(ToDoAppDbContext context) {
            _context = context;
        }
        public async Task AddTaskAsync(Tasks task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
          
        }

        public async Task<List<Tasks>?> GetTaskAsync(int UserID)
        {
            List<Tasks> user= await _context.Tasks
                         .Where(task => task.UserId == UserID && task.IsDeleted==false)
                         .ToListAsync();
            return user;
        }

        public async Task RemoveTaskAsync(int taskId,int userID)
        {

            Tasks task = _context.Tasks.FirstOrDefault(t=>t.TaskId==taskId && t.UserId==userID)!;

            if (task != null)
            {
                task.IsDeleted = true;
                await _context.SaveChangesAsync();
            }
        }

        public void RemoveTaskAll()
        {

            List<Tasks> tasks = _context.Tasks.ToList(); 

            tasks.ForEach(t => t.IsDeleted = true); 

            _context.SaveChanges();


        }

        public async Task UpdateTaskAsync(Tasks task)
        {

            if (task == null)
            {
                throw new ArgumentNullException(nameof(task));
            }

           
            var existingTask = await _context.Tasks.FirstOrDefaultAsync(t => t.TaskId == task.TaskId &&  t.UserId == task.UserId);
            if (existingTask == null)
            {
                throw new Exception("Task not found.");
            }

           
            existingTask.TaskName = task.TaskName;
            existingTask.TaskDescription = task.TaskDescription;
            existingTask.IsCompleted = task.IsCompleted;
            existingTask.IsDeleted = task.IsDeleted;
            existingTask.ModifiedAt = task.ModifiedAt;
            await _context.SaveChangesAsync();
        }
    }
}
