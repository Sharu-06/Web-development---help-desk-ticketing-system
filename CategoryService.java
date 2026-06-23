package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Category;

public interface CategoryService {
    List<Category> getAllCategories();
    Category addCategory(String name);
}
