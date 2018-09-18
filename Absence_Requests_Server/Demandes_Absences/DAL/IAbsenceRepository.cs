using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demandes_Absences.Models
{
    interface IAbsenceRepository
    {
        IEnumerable<Absence> GetAllAbsence();

        void AddAbsence(Absence absence);

        IEnumerable<string> GetReasons();
    }
}
