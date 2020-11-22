using DataBase;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prediction.Controllers
{
    [Route("api/Predictions/Users")]
    [ApiController]
    [SwaggerTag("Users")]
    public class UsersController : ControllerBase
    {
        private readonly PredictionContext _context;

        public UsersController(PredictionContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get list of Users from DB
        /// </summary>
        /// <returns>response status "OK" and list of Users</returns>
        [HttpGet()]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        /// <summary>
        /// Get User by Id from DB
        /// </summary>
        /// <param name="id">User Id</param>
        /// <returns>response status "OK" and User or status "NotFound" and error message</returns>
        [HttpGet("User/{userId}")]
        public async Task<ActionResult> GetCourse(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound($"Could not found user with Id={userId}");
            }

            return Ok(user);
        }

        /// <summary>
        /// Add new User to DB
        /// </summary>
        /// <param name="user">Course to add</param>
        /// <returns>response status "Ok" and message</returns>
        [HttpPost("User")]
        public async Task<ActionResult> AddUser([FromBody] User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok($"User with name \"{user.UserName}\" added");
        }


    }
}
