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
        IAbsenceRepository absenceRepository = InMemoryAbsenceRepository.Instance;

        public IEnumerable<Absence> GetAllAbsence()
        {
            return absenceRepository.GetAllAbsence();
        }

        public IEnumerable<Absence> FilterByReason(string reason)
        {
            return absenceRepository.GetAllAbsence().Where(n => n.Reason.ToString() == reason);
        }

        public IEnumerable<string> GetReasons()   
        {
            //  return Enum.GetNames(typeof(Reason));
            return absenceRepository.GetReasons();
        }

        public void AddAbsence(Absence absence)
        {
            int x = GetAllAbsence().ToList().LastOrDefault().Id; //TODO: DELETE asa GUID is op
            absence.EmissionDate = DateTime.Now;    //todo : initialize in front
            absence.Status = "In progress";     //todo : initialize in front
            absence.Id = x+1;
            absenceRepository.AddAbsence(absence);
        }

        public IEnumerable<Absence> GetAbsencesFilteredAndSorted(string reason, string sortingDate)
        {
            if (reason != "null")
            {
                return SortAbsences(FilterByReason(reason), sortingDate);
            }

            return SortAbsences(absenceRepository.GetAllAbsence(), sortingDate);
        }

        public IEnumerable<Absence> SortAbsences(IEnumerable<Absence> absences, string sortingDate)
        {
            if (sortingDate != null)
            {
                if (sortingDate == "emissionDate")
                {
                    absences = absences.OrderBy(n => n.EmissionDate);
                }
                else
                {
                    absences = absences.OrderBy(a => a.StartDate);
                }
            }

            return absences;
        }

        public void ChangeStatus(Absence absence)
        {
            var AbsenceToChange = absenceRepository.GetAllAbsence().SingleOrDefault(a => a.Id == absence.Id);
            AbsenceToChange.Status = absence.Status;
        }

        public IEnumerable<Absence> GetAbsencesInProgress(string status)
        {
            return absenceRepository.GetAllAbsence().Where(n => n.Status.ToString() == status);
        }
    }
}