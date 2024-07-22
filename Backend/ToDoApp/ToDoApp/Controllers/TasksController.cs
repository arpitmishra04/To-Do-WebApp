using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using ToDoApp.BLL.Interfaces;
using ToDoApp.Common.Model.Dto;
using ToDoApp.Common.Model.Input;
using ToDoApp.Common.Model.Response;
using ToDoApp.DAL.Entities;

namespace ToDoApp.API.Controllers
{

    [ApiController]
    [Route("api/task")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
            TinyMapper.Bind<TaskInput, DtoTask>();
        }

        [HttpPost]   
        public async Task<IActionResult> AddTask([FromBody] TaskInput taskAdditionRequest)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            taskAdditionRequest.UserId = Convert.ToInt32(userId);
            DtoTask TaskOperationRequest = TinyMapper.Map<TaskInput, DtoTask>(taskAdditionRequest);
            await _taskService.AddTaskAsync(TaskOperationRequest);
            var successResponse = new Response
            {
                Success = true
            };
            return Ok(successResponse);
        }

        [HttpGet]
        public async Task<IActionResult> GetTask()
        {
            var strId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            int userId = Convert.ToInt32(strId);
            var task = await _taskService.GetTaskAsync(userId);
            if (task == null)
            {
                var response = new Response<Tasks>
                {
                    Errors = new List<string> { "Tasks Not Found" },
                    Success = false
                };
                return NotFound(response);
            }
            var successResponse = new Response<List<Tasks>>
            {
                Data = task,
                Success = true
            };
            return Ok(successResponse);
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> RemoveTask([FromRoute] int taskId)
        {
            var strId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            int userId = Convert.ToInt32(strId);
            await _taskService.RemoveTaskAsync(taskId, userId);
            var successResponse = new Response
            {
                Success = true
            };
            return Ok(successResponse);
        }

        [HttpDelete]
        public ActionResult RemoveTaskAll()
        {
             _taskService.RemoveTaskAll();
            var successResponse = new Response
            {
                Success = true
            };
            return Ok(successResponse);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTask([FromBody] TaskInput taskUpdationRequest)
        {
            var strId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            taskUpdationRequest.UserId = Convert.ToInt32(strId);
            DtoTask TaskOperationRequest = TinyMapper.Map<TaskInput, DtoTask>(taskUpdationRequest);
            await _taskService.UpdateTaskAsync(TaskOperationRequest);
            var successResponse = new Response
            {
                Success = true
            };
            return Ok(successResponse);
        }
    }
}
