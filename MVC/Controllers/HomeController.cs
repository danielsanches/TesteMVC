﻿using System.Web.Mvc;

namespace MVC.Controllers
{
    public class HomeController : Controller
    {
        public HomeController() : base() { }

        public ActionResult Index()
        {
            return View();
        }
    }
}