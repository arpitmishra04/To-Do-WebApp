using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nelibur.ObjectMapper;
using ToDoApp.BLL.Interfaces;
using ToDoApp.Common.Model.Dto;
using ToDoApp.Common.Model.Input;
using ToDoApp.Common.Model.Response;
using ToDoApp.DAL.Entities;

namespace ToDoApp.API.Controllers
{
    [ApiController]
    [Route("api/user")]
  
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IJwtAuthenticationManager _jwtAuthenticationManager;
        public UserController(IUserService userService, IJwtAuthenticationManager jwtAuthenticationManager)
        {
            _userService = userService;
            _jwtAuthenticationManager = jwtAuthenticationManager;
            TinyMapper.Bind<UserInput, DtoUser>();
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserInput registerUserRequest)
        {
           
                var user = await _userService.GetUserAsync(registerUserRequest.UserName);
         
                if (user != null)
                {
                var response = new Response<User>
                    {
                        Errors = new List<string> { "Username already exists" },
                        Success = false
                    };
                    return Conflict(response);
                }

            DtoUser userRequest = TinyMapper.Map<UserInput, DtoUser>(registerUserRequest);

                await _userService.AddUserAsync(userRequest!);
                var token = _jwtAuthenticationManager.Authenticate(userRequest);
                var successResponse = new Response<object>
                {
                    Data = new { Token = token },
                    Success = true
                };
                return Ok(successResponse);
            
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserInput loginUserRequest)
        {
            var response = new Response<object>();
            
                var user = await _userService.GetUserAsync(loginUserRequest.UserName);
                if (user == null || !BCrypt.Net.BCrypt.Verify(loginUserRequest.Password, user.Password)) {
                    response.Errors.Add("Invalid username or password.");
                    response.Success = false;
                    return Unauthorized(response);
                }

                var token = _jwtAuthenticationManager.Authenticate(user);
                var successResponse = new Response<object>
                {
                    Data = new { Token = token },
                    Success = true
                };
                return Ok(successResponse);
           
        }


        //API testing routes
        [Authorize]
        [HttpGet("GetUser/{username}")]
        public async Task<IActionResult> GetUser(string username)
        {
            var user = await _userService.GetUserAsync(username);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [Authorize]
        [HttpGet("CheckUser/{username}")]
        public async Task<IActionResult> CheckUser(string username)
        {
            var exists = await _userService.CheckUserAsync(username);
            return Ok(exists);
        }

    }
}
