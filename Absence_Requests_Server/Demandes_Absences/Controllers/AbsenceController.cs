using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Demandes_Absences.BL;
using Demandes_Absences.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Demandes_Absences.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AbsenceController : ControllerBase
    {
        IAbsenceBO bo = new AbsenceBO();

        [HttpGet("[action]")]
        public List<Absence> GetAllAbsences()
        {
            return bo.GetAllAbsence().ToList();
        }

        [HttpGet("[action]")]
        public List<Absence> GetAbsencesFilteredAndSorted(string reason, string sortingDate)
        {
            return bo.GetAbsencesFilteredAndSorted(reason, sortingDate).ToList();
        }

        [HttpPost("[action]")]
        public void AddAbsence([FromBody] Absence absence)  //todo : verify frombody
        {
            bo.AddAbsence(absence); //todo verify null?
        }

        [HttpPut("[action]")]
        public void ChangeStatus(Absence absence)
        {
            bo.ChangeStatus(absence); //todo verify null?
        }

        [HttpGet("[action]")]
        public List<Absence> GetAbsencesInProgress(string status)
        {
            return bo.GetAbsencesInProgress(status).ToList();
        }

    }
}