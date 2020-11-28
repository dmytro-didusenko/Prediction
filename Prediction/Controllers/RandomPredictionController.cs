using DataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prediction.Controllers
{
    [Route("api/Predictions/Random")]
    [ApiController]
    [SwaggerTag("Random")]
    public class RandomPredictionController : Controller
    {
        private readonly PredictionContext _context;

        public RandomPredictionController(PredictionContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get random Predicrion by selected topic for specific user
        /// </summary>
        /// <param name="token">Token to define user</param>
        /// <param name="topic">Topic name for predictions</param>
        /// <returns>response statys "Ok" and randon prediction or statys "BadRequest" and error message</returns>
        [HttpGet("{token}/{topic}")]
        public IActionResult GetRandomPrediction(string token, string topic)
        {
            Topic topicResult = _context.Topics.
                                        Where(t => t.UserToken.Equals(token) && t.TopicName.Equals(topic))
                                        .FirstOrDefault();

            if (topicResult != null)
            {
                var predictions = _context.PredictionItems
                                            .Where(pr => pr.TopicId == topicResult.TopicId)
                                            .ToList();

                if (predictions != null && predictions.Any())
                {
                    Random random = new Random();

                    int predictionIndex = random.Next(0, predictions.Count());

                    return Ok(predictions[predictionIndex]);
                }
                else
                {
                    return NotFound();
                }
            }

            return BadRequest();
        }
    }
}
