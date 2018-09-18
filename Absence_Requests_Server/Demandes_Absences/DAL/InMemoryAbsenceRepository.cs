using Demandes_Absences.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demandes_Absences.DAL
{
    public class InMemoryAbsenceRepository : IAbsenceRepository
    {
        #region Singleton
        private static InMemoryAbsenceRepository instance = null;
        private static readonly object padLock = new object();

        private InMemoryAbsenceRepository()
        {
        }

        public static InMemoryAbsenceRepository Instance
        {
            get
            {
                lock (padLock)
                {
                    if (instance == null)
                    {
                        instance = new InMemoryAbsenceRepository();
                    }
                    return instance;
                }
            }
        }
        #endregion

        public List<Absence> absences = new List<Absence>()
            {
               new Absence() {Id= 0, EmissionDate=new DateTime(2018, 07, 31), StartDate=new DateTime(2018, 08, 16), EndDate=new DateTime(2018, 08, 20), Reason="Leave family events", Status="Approved"},
               new Absence() {Id= 1, EmissionDate=new DateTime(2018, 06, 25), StartDate=new DateTime(2018, 12, 26), EndDate=new DateTime(2018, 12, 28), Reason="Paid vacation", Status="Refused"},
               new Absence() {Id= 2, EmissionDate=new DateTime(2018, 05, 14), StartDate=new DateTime(2018, 05, 15), EndDate=new DateTime(2018, 05, 20), Reason="RTT", Status="Refused"},
               new Absence() {Id= 3, EmissionDate=new DateTime(2018, 04, 12), StartDate=new DateTime(2018, 04, 10), EndDate=new DateTime(2018, 04, 20), Reason="RTT", Status="Approved"},
               new Absence() {Id= 4, EmissionDate=new DateTime(2018, 04, 02), StartDate=new DateTime(2018, 04, 05), EndDate=new DateTime(2018, 04, 06), Reason="Sick child", Status="Approved"},
               new Absence() {Id= 5, EmissionDate=new DateTime(2018, 03, 03), StartDate=new DateTime(2018, 12, 06), EndDate=new DateTime(2018, 12, 08), Reason="Leave family events", Status="In progress"},
               new Absence() {Id= 6, EmissionDate=new DateTime(2018, 07, 01), StartDate=new DateTime(2018, 07, 16), EndDate=new DateTime(2018, 07, 20), Reason="Paid vacation", Status="Approved"},
               new Absence() {Id= 7, EmissionDate=new DateTime(2018, 09, 17), StartDate=new DateTime(2018, 09, 19), EndDate=new DateTime(2018, 10, 16), Reason="Paid vacation", Status="In progress"}
            };

        public List<string> reasons = new List<string>() { "Paid vacation", "RTT", "Sick child", "Leave family events" };
        public List<string> status = new List<string>() { "Approved", "In progress", "Refused" };

        public IEnumerable<Absence> GetAllAbsence()
        {
            return absences;
        }

        public void AddAbsence(Absence absence)
        {
            absences.Add(absence);
        }

        public IEnumerable<string> GetReasons()
        {
            return reasons;
        }

    }
}
