using Demandes_Absences.Models;
using System;
using System.Collections.Generic;

namespace Demandes_Absences.BL
{
    interface IAbsenceBO
    {
        IEnumerable<Absence> GetAllAbsence();

        IEnumerable<Absence> FilterByReason(string reason);

        IEnumerable<string> GetReasons();

        void AddAbsence(Absence absence);

        IEnumerable<Absence> GetAbsencesFilteredAndSorted(string reason, string sortingDate);
    }
}