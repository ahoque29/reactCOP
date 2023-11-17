using AlertApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AlertApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AlertDataController : ControllerBase
{
    [HttpGet(Name = "GetAlertData")]
    public async Task<IActionResult> Get()
    {
        await Task.Delay(1000);

        var random = new Random();
        if (random.Next() % 2 == 0)
        {
            return BadRequest("Unable to produce alert data");
        }

        return Ok(new List<AlertData>
        {
            new()
            {
                Id = "1",
                Type = "Low disk space",
                Source = "localhost",
                Status = "Active",
                LastUpdated = "15:18"
            },
            new()
            {
                Id = "2",
                Type = "Blocking process",
                Source = "localhost",
                Status = "Active",
                LastUpdated = "15:18"
            },
        });
    }
}