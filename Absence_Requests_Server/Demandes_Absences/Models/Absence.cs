using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demandes_Absences.Models
{
    public class Absence
    {
        public int Id { get; set; } //todo : guid
        public DateTime EmissionDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; }
    }

    /*
     *  // [JsonConverter(typeof(StringEnumConverter))]
    public enum Reason
    {
        PaidVacation,
        RTT,
        SickChild,
        LeaveFamilyEvents
    }

    public enum Status
    {
        InProgress,
        Approved,
        Refused
    }
    */
}
