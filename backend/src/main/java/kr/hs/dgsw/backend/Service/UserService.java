package kr.hs.dgsw.backend.Service;

import kr.hs.dgsw.backend.Domain.User;

import java.util.List;

public interface UserService {
    List<User> findAll();
    int deleteById(Long id);
    Long add(User user);
    int modify(User user);
    User findById(Long id);
    User findByAccount(String account);
    User login(User user);
}
