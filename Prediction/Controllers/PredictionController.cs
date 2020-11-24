using DataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prediction.Controllers
{
    [Route("api/Predictions")]
    [ApiController]
    [SwaggerTag("Predictions")]
    public class PredictionsController : Controller
    {
        private readonly PredictionContext _context;

        public PredictionsController(PredictionContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get list of Predictions from DB
        /// </summary>
        /// <returns>response status "OK" and list of Predictions</returns>
        [HttpGet()]
        public async Task<ActionResult<List<PredictionItem>>> GetPredictions()
        {
            return Ok(await _context.PredictionItems.ToListAsync());
        }

        /// <summary>
        /// Get list of Predictions for specific topic from DB
        /// </summary>
        /// /// <param name="topicId">Topic Id</param>
        /// <returns>response status "OK" and list of Predictions</returns>
        [HttpGet("Topic/{topicId}/Predictions")]
        public async Task<ActionResult<List<PredictionItem>>> GetPredictionsByTopic(int topicId)
        {
            return Ok(await _context.PredictionItems.Where(id => id.TopicId == topicId).ToListAsync());
        }

        /// <summary>
        /// Get Prediction by Id from DB
        /// </summary>
        /// <param name="id">Prediction Id</param>
        /// <returns>response status "OK" and User or status "NotFound" and error message</returns>
        [HttpGet("Prediction/{predictionId}")]
        public async Task<ActionResult> GetPrediction(int predictionId)
        {
            var user = await _context.Users.FindAsync(predictionId);

            if (user == null)
            {
                return NotFound($"Could not found Prediction with Id={predictionId}");
            }

            return Ok(user);
        }

        /// <summary>
        /// Add new Prediction to DB
        /// </summary>
        /// <param name="prediction">Prediction to add</param>
        /// <returns>response status "Ok" and message</returns>
        [HttpPost("Prediction")]
        public async Task<ActionResult> AddPrediction([FromBody] PredictionItem prediction)
        {
            _context.PredictionItems.Add(prediction);
            await _context.SaveChangesAsync();

            return Ok($"Prediction added");
        }
    }
}
