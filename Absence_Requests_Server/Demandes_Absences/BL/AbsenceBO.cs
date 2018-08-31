using Demandes_Absences.DAL;
using Demandes_Absences.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demandes_Absences.BL
{
    public class AbsenceBO : IAbsenceBO
    {
        IAbsenceRepository absenceRepository = new InMemoryAbsenceRepository();

        public IEnumerable<Absence> GetAllAbsence()
        {
            return absenceRepository.GetAllAbsence();
        }

        public IEnumerable<Absence> SortByEmissionDate()
        {
            return absenceRepository.GetAllAbsence().OrderBy(n => n.EmissionDate);
        }
        public IEnumerable<Absence> SortByStartDate()
        {
            return absenceRepository.GetAllAbsence().OrderBy(n => n.StartDate);
        }

        public IEnumerable<Absence> FilterByReason(string reason)
        {
            return absenceRepository.GetAllAbsence().Where(n => n.Reason.ToString() == reason);
        }

        public IEnumerable<string> GetReasons()
        {
            return Enum.GetNames(typeof(Reason));
        }

        public void AddAbsence(Absence absence)
        {
            absence.Status = Status.InProgress;
            absenceRepository.AddAbsence(absence);
        }

        public int SetNbOfDays(DateTime startDate, DateTime endDate)
        {
            int offset, nbofWeekendDays, nbOfDays;

            nbOfDays = (int)endDate.Subtract(startDate).TotalDays;

            if (startDate.DayOfWeek == DayOfWeek.Monday && nbOfDays >= 7)
            {
                offset = 5;
            }
            else if (startDate.DayOfWeek == DayOfWeek.Tuesday && nbOfDays >= 6)
            {
                offset = 4;

            }
            else if (startDate.DayOfWeek == DayOfWeek.Wednesday && nbOfDays >= 5)
            {
                offset = 3;

            }
            else if (startDate.DayOfWeek == DayOfWeek.Thursday && nbOfDays >= 4)
            {
                offset = 2;

            }
            else if (startDate.DayOfWeek == DayOfWeek.Friday && nbOfDays >= 3)
            {
                offset = 1;

            }
            else
            {
                offset = 0;
            }

            if (offset != 0)
            {
                nbofWeekendDays = 2 * ((nbOfDays - offset) / 7 + 1);
                nbOfDays -= nbofWeekendDays;
            }

            return nbOfDays + 1;
        }
    }
}
