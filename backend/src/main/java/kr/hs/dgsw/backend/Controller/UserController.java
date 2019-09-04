package kr.hs.dgsw.backend.Controller;

import kr.hs.dgsw.backend.Domain.User;
import kr.hs.dgsw.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping(value = "/api/user")
    public List findAll() {
        return userService.findAll();
    }

    @GetMapping(value = "/api/user/id")
    public User findById(@Param("id") Long id) {
        return userService.findById(id);
    }

    @GetMapping(value = "/api/user/account")
    public User findByAccount(@Param("account") String account) {
        return userService.findByAccount(account);
    }

    @PostMapping(value = "/api/user")
    public Long add(@RequestBody User user) {
        return userService.add(user);
    }

    @PostMapping(value = "/api/user/login")
    public User login(@RequestBody User user) {
        return userService.login(user);
    }

    @PutMapping(value = "/api/user")
    public int modify(@RequestBody User user) {
        return userService.modify(user);
    }

    @DeleteMapping(value = "/api/user")
    public int deleteById(@Param("id") Long id) {
        return userService.deleteById(id);
    }
}
