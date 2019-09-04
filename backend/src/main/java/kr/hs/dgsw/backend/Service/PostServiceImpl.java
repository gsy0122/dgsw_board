package kr.hs.dgsw.backend.Service;

import kr.hs.dgsw.backend.Domain.Post;
import kr.hs.dgsw.backend.Domain.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostMapper postMapper;

    @Override
    public List<Post> findAll() {
        return postMapper.findAll();
    }

    @Override
    public List<Post> findAllByViews() {
        return postMapper.findAllByViews();
    }

    @Override
    public List<Post> findAllByLikes() {
        return postMapper.findAllByLikes();
    }

    @Override
    public Long add(Post post) {
        return postMapper.add(post);
    }

    @Override
    public int modify(Post post) {
        return postMapper.modify(post);
    }

    @Override
    public int modifyByViews(Post post) {
        return postMapper.modifyByViews(post);
    }

    @Override
    public int modifyByLikes(Post post) {
        return postMapper.modifyByLikes(post);
    }

    @Override
    public int deleteById(Long id) {
        return postMapper.deleteById(id);
    }

    @Override
    public Post findById(Long id) {
        return postMapper.findById(id);
    }

    @Override
    public List<Post> findByUserId(Long userId) {
        return postMapper.findByUserId(userId);
    }

    @Override
    public List<Post> findByCategory(Long category) {
        return postMapper.findByCategory(category);
    }
}
