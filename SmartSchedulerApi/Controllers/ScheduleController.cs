using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using SmartSchedulerApi;
using SmartSchedulerApi.Services;

namespace SmartSchedulerApi.Controllers
{
    [ApiController]
    [Route("api/v1/projects/{projectId}/[controller]")]
    public class ScheduleController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post(string projectId, [FromBody] ScheduleRequest request)
        {
            if (request == null || !request.Tasks.Any())
            {
                return BadRequest("Tasks cannot be empty.");
            }

            var recommendedOrder = TopologicalSort.SortTasks(request.Tasks, out var errors);

            if (recommendedOrder == null)
            {
                return BadRequest(errors);
            }

            return Ok(new ScheduleResponse { RecommendedOrder = recommendedOrder });
        }
    }
}
