﻿using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBase;
using Microsoft.EntityFrameworkCore;

namespace Prediction.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : Controller
    {
        private readonly PredictionContext _context;

        public TopicsController(PredictionContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get list of Topics from DB
        /// </summary>
        /// <returns>response status "OK" and list of Topics</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopics()
        {
            return Ok(await _context.Topics.ToListAsync());
        }

        /// <summary>
        /// Get Topics by Id from DB
        /// </summary>
        /// <param name="id">Topics Id</param>
        /// <returns>response status "OK" and Topics or status "NotFound" and error message</returns>
        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetTopic(int id)
        {
            var topic = await _context.Topics.FindAsync(id);

            if (topic == null)
            {
                return NotFound($"Could not found Topic with Id={id}");
            }

            return Ok(topic);
        }

        /// <summary>
        /// Change defined by Id Topic in DB
        /// </summary>
        /// <param name="topic">Topic to update</param>
        /// <returns>response status "NoContent" or status "BadRequest" if no Topic Id to change in DB
        ///     and if Topic to change is null</returns>
        [HttpPut]
        public async Task<IActionResult> PutTopic([FromBody] Topic topic)
        {
            if (topic == null)
            {
                return BadRequest($"Inputed Topic's data is null");
            }

            _context.Entry(topic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(topic);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicExists(topic.TopicId))
                {
                    return NotFound($"Could not found Topic with id={topic.TopicId}");
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Add new Topic to DB
        /// </summary>
        /// <param name="topic">Topic to add</param>
        /// <returns>response status "Ok" and message</returns>
        [HttpPost]
        public async Task<ActionResult> PostTopic([FromBody] Topic topic)
        {
            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();

            return Ok(topic);
        }

        // DELETE: api/Topics/5 - deletes Topic by Id

        /// <summary>
        /// Delete Topic by Id from DB
        /// </summary>
        /// <param name="id">Topic Id to delete</param>
        /// <returns>response status "Ok" and message or status "NotFound" and message 
        ///     if Topic with inputed Id doesn't exists in DB</returns>
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteTopic(int id)
        {
            var topic = await _context.Topics.FindAsync(id);
            if (topic == null)
            {
                return NotFound($"Could not found Topic with Id={id}");
            }

            _context.Topics.Remove(topic);
            await _context.SaveChangesAsync();
        
            return Ok();
        }

        /// <summary>
        /// Returns true if Topic with Id exists id DB
        /// </summary>
        /// <param name="id">Topic Id</param>
        /// <returns>"true" if Topic with inputed Id exists in DB or "false" if not</returns>
        [HttpGet("{id:int}")]
        private bool TopicExists(int id)
        {
            return _context.Topics.Any(e => e.TopicId == id);
        }
    }
}
