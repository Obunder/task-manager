package nicelittlewebsite.backend.Repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nicelittlewebsite.backend.Models.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // You automatically get CRUD methods: save(), findAll(), findById(), deleteById(), etc.
}

    
