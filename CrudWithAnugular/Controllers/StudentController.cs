using CrudWithAnugular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudWithAnugular.Controllers
{
    public class StudentController : Controller
    {
        private Entities db;
        // GET: Student
        public ActionResult Index()
        {
            return View();
        }

        public string InsertStudentRecord(Student student)
        {
            using (db=new Entities())
            {
                db.Students.Add(student);
                db.SaveChanges();
                return "Student Added Successfully!";
            }
        }

        public JsonResult GetAllStudent()
        {
            db = new Entities();
            var AllRecord = db.Students.ToList();
            return Json(AllRecord, JsonRequestBehavior.AllowGet);
        }

        public string UpdateStudentRecord(Student std)
        {
            using (db=new Entities())
            {
                var record = db.Students.Find(std.ID);
                record.Name = std.Name;
                record.Age = std.Age;
                record.Department = std.Department;
                db.SaveChanges();
                return "Student Record Updaetd Successfully!";
            }
        }

        public string DeleteStudent(Student std)
        {
            using (db=new Entities())
            {
                var data = db.Students.Find(std.ID);
                db.Students.Remove(data);
                db.SaveChanges();
                return "Record Deleted Successfuly!";
            }
        }
    }
}