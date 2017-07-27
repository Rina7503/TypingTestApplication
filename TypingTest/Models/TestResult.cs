using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TypingTest.Models {
    public class TestResult {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Text title")]
        public string textTitle { get; set; }
        [Display(Name = "Test duration")]
        public string factTime { get; set; }
        [Display(Name = "Printed chars")]
        public int numberPrintedSymbols { get; set; }
        [Display(Name = "Printed words")]
        public int numberPrintedWords { get; set; }
        [Display(Name = "Max speed, symb./sec.")]
        public int typingSpeedMax { get; set; }
        [Display(Name = "Average speed, symb./min.")]
        public int typingAverageSpeed { get; set; }
        [Display(Name = "Errors")]
        public int mistakesCount { get; set; }
        [Display(Name = "Errors, %")]
        public string mistakesPersent { get; set; }
    }
}