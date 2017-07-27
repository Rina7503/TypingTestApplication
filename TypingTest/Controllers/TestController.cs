using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TypingTest.Models;

namespace TypingTest.Controllers
{
    public class TestController : Controller
    {
        // GET: Test
        public ActionResult Index() {
            List<string> Texts = new List<string>();
            Texts.Add("Jack London - \"Martin Iden\"");
            Texts.Add("Astronauts");
            Texts.Add("Zebras");
            Texts.Add("short");
            ViewBag.Texts = Texts;

            List<int> timeList = new List<int>();
            timeList.Add(1);
            timeList.Add(2);
            timeList.Add(3);

            ViewBag.timeList = timeList;
            return View();
        }

        [HttpPost]
        public ActionResult Result(TestResult testResult) {
            ViewResult result = View("Result", testResult);
            return result;
        }
    }
}