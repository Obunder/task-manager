package nicelittlewebsite.backend.Repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import nicelittlewebsite.backend.Models.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
    boolean existsByUsername(String username);
}
