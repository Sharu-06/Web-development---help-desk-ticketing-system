package com.examly.springapp.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Category;
import com.examly.springapp.repository.CategoryRepository;
import com.examly.springapp.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category addCategory(String name) {
        if(categoryRepository.existsByName(name)) {
            throw new RuntimeException("Category already exists");
        }
        Category c = new Category();
        c.setName(name);
        return categoryRepository.save(c);
    }
}
