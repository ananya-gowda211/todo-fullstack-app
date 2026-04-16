package com.example.todo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository repo;

    public TaskController(TaskRepository repo) {
        this.repo = repo;
    }

    // GET all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    // POST new task
    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return repo.save(task);
    }

    // DELETE task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task task = repo.findById(id).orElseThrow();
        task.setDescription(updatedTask.getDescription());
        return repo.save(task);
    }
}