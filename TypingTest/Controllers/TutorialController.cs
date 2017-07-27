using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TypingTest.Controllers
{
    public class TutorialController : Controller
    {

        public ActionResult part0() {
            @ViewBag.Selection0 = "Selected";
            ViewBag.currentPage = 0;
            @ViewBag.prevTitle = "link";
            @ViewBag.nextTitle = "1. Create and Prepare an MVC Project";
            return View();
        }
        public ViewResult part1() {
            @ViewBag.Selection1 = "Selected";
            ViewBag.currentPage = 1;
            @ViewBag.prevTitle = "Introduction";
            @ViewBag.nextTitle = "2. Add the Selection of the Text Fragment and the Time Period";
            return View();
        }
        public ViewResult part2() {
            @ViewBag.Selection2 = "Selected";
            ViewBag.currentPage = 2;
            @ViewBag.prevTitle = "1. Create and Prepare an MVC Project";
            @ViewBag.nextTitle = "3. Add the Loading of the Original Text";
            return View();
        }
        public ViewResult part3() {
            @ViewBag.Selection3 = "Selected";
            ViewBag.currentPage = 3;
            @ViewBag.prevTitle = "2. Add the Selection of the Text Fragment and the Time Period";
            @ViewBag.nextTitle = "4. Add the User Text Input and Output";
            return View();
        }
        public ViewResult part4() {
            @ViewBag.Selection4 = "Selected";
            ViewBag.currentPage = 4;
            @ViewBag.prevTitle = "3. Add the Loading of the Original Text";
            @ViewBag.nextTitle = "5. Add the Verification of the User Text";
            return View();
        }
        public ViewResult part5() {
            @ViewBag.Selection5 = "Selected";
            ViewBag.currentPage = 5;
            @ViewBag.prevTitle = "4. Add the User Text Input and Output";
            @ViewBag.nextTitle = "6. Add the UI Elements to Track the Dynamic Results";
            return View();
        }
        public ViewResult part6() {
            @ViewBag.Selection6 = "Selected";
            ViewBag.currentPage = 6;
            @ViewBag.prevTitle = "5. Add the Verification of the User Text";
            @ViewBag.nextTitle = "7. Add Validation and Notification problems";
            return View();
        }
        public ViewResult part7() {
            @ViewBag.Selection7 = "Selected";
            ViewBag.currentPage = 7;
            @ViewBag.prevTitle = "6. Add the UI Elements to Track the Dynamic Results";
            @ViewBag.nextTitle = "8. Add Default Settingst";
            return View();
        }
        public ViewResult part8() {
            @ViewBag.Selection8 = "Selected";
            ViewBag.currentPage = 8;
            @ViewBag.prevTitle = "7. Add Validation and Notification problems";
            @ViewBag.nextTitle = "9. Prepare and Output the Test Results";
            return View();
        }
        public ViewResult part9() {
            @ViewBag.Selection9 = "Selected";
            ViewBag.currentPage = 9;
            @ViewBag.prevTitle = "8. Add Default Settings";
            @ViewBag.nextTitle = "link";
            return View();
        }
    }
}