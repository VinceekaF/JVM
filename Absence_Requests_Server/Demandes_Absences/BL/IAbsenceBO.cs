using Demandes_Absences.Models;
using System;
using System.Collections.Generic;

namespace Demandes_Absences.BL
{
    interface IAbsenceBO
    {
        IEnumerable<Absence> GetAllAbsence();

        IEnumerable<Absence> SortByEmissionDate();

        IEnumerable<Absence> SortByStartDate();

        IEnumerable<Absence> FilterByReason(string reason);

        IEnumerable<string> GetReasons();

        void AddAbsence(Absence absence);

        int SetNbOfDays(DateTime startDate, DateTime endDate);
    }
}