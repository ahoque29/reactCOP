using AlertApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AlertApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AlertDataController : ControllerBase
{
    [HttpGet(Name = "GetAlertData")]
    public IActionResult Get()
    {
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