﻿using CorrectionTodoLists.Models;
using CorrectionTodoLists.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CorrectionTodoLists.Controllers
{
    [ApiController]
    [Route("api/v1/todolists")]
    public class ToDoListController : ControllerBase
    {
        private ToDoListRepository _toDoListRepository;

        public ToDoListController(ToDoListRepository toDoListRepository)
        {
            _toDoListRepository = toDoListRepository;
        }

        [HttpGet]
        public List<ToDoList> Get(string? title = null)
        {
            if (title == null)
                return _toDoListRepository.FindAll();
            else
                return _toDoListRepository.Search(t => t.Title.Contains(title));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            ToDoList toDoList = _toDoListRepository.FindById(id);
            if(toDoList != null)
                return Ok(toDoList);
            return NotFound();
        }

        [HttpPost]
        public IActionResult Save([FromBody] ToDoList toDoList)
        {
            if(_toDoListRepository.Save(toDoList))
            {
                return Ok(toDoList);
            }
            return StatusCode(500, new {Message = "Erreur serveur"});
        }
        
    }
}
