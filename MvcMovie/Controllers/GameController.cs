using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcMovie.Controllers
{
    public class GameController : Controller
    {
        // GET: PhotoGame
        public ActionResult PhotoGame()
        {
            return View();
        }
        public ActionResult CountGame()
        {
            return View();
        }
        public ActionResult TicTacToe()
        {
            return View();
        }
    }
}